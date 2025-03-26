import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoComponent from '../../components/LogoComponent';

interface InterviewDetailScreenProps {
  navigation: any;
  route: any;
}

const InterviewDetailScreen: React.FC<InterviewDetailScreenProps> = ({ navigation, route }) => {
  const { interviewId } = route.params;
  
  // In a real app, fetch interview details based on the ID
  const interviewDetails = {
    id: interviewId,
    title: 'Frontend Dev Interview',
    date: '2025-02-28',
    score: '84/100',
    duration: '32m 14s',
    questions: 12,
    status: 'Technical',
    feedback: [
      'Strong knowledge of React and state management',
      'Good communication skills, explained concepts clearly',
      'Demonstrated problem-solving abilities with practical examples',
      'Could improve on optimizing performance in React applications',
    ],
    transcript: [
      {
        speaker: 'AI',
        text: 'How would you manage global state in a React application?',
      },
      {
        speaker: 'You',
        text: 'I would consider several options depending on the application needs. For simpler apps, React Context with useReducer might be sufficient. For more complex applications with lots of state changes, I would use Redux or Zustand. Redux provides a predictable state container with a well-established pattern, though it requires more boilerplate code. Zustand is more lightweight and has a simpler API.',
      },
      {
        speaker: 'AI',
        text: 'Can you explain the difference between React.memo, useMemo, and useCallback?',
      },
      {
        speaker: 'You',
        text: 'React.memo is a higher-order component that memoizes a component, preventing rerenders if props haven\'t changed. useMemo is a hook that memoizes a computed value, recalculating only when dependencies change. useCallback is similar to useMemo but specifically for functions, it returns a memoized version of the callback that only changes if dependencies change. All three help with performance optimization by reducing unnecessary rerenders or calculations.',
      },
    ],
  };
  
  const getIconBgColor = () => {
    return '#8B6CEF'; // Purple for Frontend
  };
  
  const getStatusBadgeStyle = (status: 'Technical' | 'Non-Technical') => {
    return {
      backgroundColor: status === 'Technical' ? '#2D2B55' : '#3A3347',
    };
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <LogoComponent size="small" />
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.interviewHeader}>
          <View style={[styles.iconCircle, { backgroundColor: getIconBgColor() }]}>
            <Text style={styles.iconText}>F</Text>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.interviewTitle}>{interviewDetails.title}</Text>
            <Text style={styles.interviewDate}>{formatDate(interviewDetails.date)}</Text>
          </View>
          
          <View style={[styles.statusBadge, getStatusBadgeStyle(interviewDetails.status as any)]}>
            <Text style={styles.statusText}>{interviewDetails.status}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{interviewDetails.score}</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{interviewDetails.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{interviewDetails.questions}</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
        </View>
        
        <View style={styles.feedbackCard}>
          <Text style={styles.sectionTitle}>Key Feedback</Text>
          
          {interviewDetails.feedback.map((item, index) => (
            <View key={index} style={styles.feedbackItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.feedbackText}>{item}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.transcriptCard}>
          <Text style={styles.sectionTitle}>Transcript Highlights</Text>
          
          {interviewDetails.transcript.map((item, index) => (
            <View key={index} style={styles.transcriptItem}>
              <Text style={styles.speakerText}>{item.speaker}</Text>
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View Full Transcript</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={() => navigation.navigate('CreateInterview')}
          >
            <Text style={styles.retakeButtonText}>Take Similar Interview</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={() => alert('Share functionality would be implemented here')}
          >
            <Text style={styles.shareButtonText}>Share Results</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  interviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
  },
  interviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  interviewDate: {
    fontSize: 14,
    color: '#B4B4B4',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A25',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#B4B4B4',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2A2A2A',
  },
  feedbackCard: {
    backgroundColor: '#1A1A25',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  feedbackItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2969FF',
    marginTop: 6,
    marginRight: 8,
  },
  feedbackText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  transcriptCard: {
    backgroundColor: '#1A1A25',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  transcriptItem: {
    marginBottom: 16,
  },
  speakerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B6CEF',
    marginBottom: 4,
  },
  messageContainer: {
    backgroundColor: '#292836',
    borderRadius: 12,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  viewMoreButton: {
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    marginTop: 8,
  },
  viewMoreText: {
    color: '#2969FF',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#2969FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  retakeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2969FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  shareButtonText: {
    color: '#2969FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InterviewDetailScreen; 