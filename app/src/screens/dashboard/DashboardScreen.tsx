import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import LogoComponent from '../../components/LogoComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Interview {
  id: string;
  title: string;
  date: string;
  score: string;
  status: 'Technical' | 'Non-Technical';
  icon: string;
}

interface InterviewType {
  id: string;
  title: string;
  status: 'Technical' | 'Non-Technical';
  icon: string;
  description: string;
}

interface DashboardScreenProps {
  navigation: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  
  // Sample data for completed interviews
  const [pastInterviews, setPastInterviews] = useState<Interview[]>([
    {
      id: '1',
      title: 'Frontend Dev Interview',
      date: '2025-02-28',
      score: '12/100',
      status: 'Technical',
      icon: 'H',
    },
    {
      id: '2',
      title: 'Behavioral Interview',
      date: '2025-02-23',
      score: '54/100',
      status: 'Non-Technical',
      icon: 'F',
    },
    {
      id: '3',
      title: 'Backend Dev Interview',
      date: '2025-02-21',
      score: '84/100',
      status: 'Technical',
      icon: 'A',
    },
  ]);
  
  // Sample data for available interview types
  const [availableInterviews, setAvailableInterviews] = useState<InterviewType[]>([
    {
      id: '1',
      title: 'Full-Stack Dev Interview',
      status: 'Technical',
      icon: 'Y',
      description: 'This interview does not reflect serious interest or engagement from the candidate.',
    },
    {
      id: '2',
      title: 'DevOps & Cloud Interview',
      status: 'Technical',
      icon: 'R',
      description: 'This interview does not reflect serious interest or engagement from the candidate.',
    },
    {
      id: '3',
      title: 'HR Screening Interview',
      status: 'Non-Technical',
      icon: 'T',
      description: 'This interview does not reflect serious interest or engagement from the candidate.',
    },
    {
      id: '4',
      title: 'System Design Interview',
      status: 'Technical',
      icon: 'D',
      description: 'This interview does not reflect serious interest or engagement from the candidate.',
    },
    {
      id: '5',
      title: 'Business Analyst Interview',
      status: 'Non-Technical',
      icon: 'S',
      description: 'This interview does not reflect serious interest or engagement from the candidate.',
    },
    {
      id: '6',
      title: 'Mobile App Dev Interview',
      status: 'Technical',
      icon: 'Q',
      description: 'This interview does not reflect serious interest or engagement from the candidate.',
    },
  ]);

  const getStatusBadgeStyle = (status: 'Technical' | 'Non-Technical') => {
    return {
      backgroundColor: status === 'Technical' ? '#2D2B55' : '#3A3347',
    };
  };
  useEffect(() => {
  AsyncStorage.clear();
  }, []);
  const getIconBgColor = (icon: string) => {
    // Map icons to colors (simplified for demo)
    const colorMap: { [key: string]: string } = {
      'H': '#8B6CEF',  // Purple for Frontend
      'F': '#1877F2',  // Facebook blue for Behavioral
      'A': '#FF3366',  // Red for Backend
      'Y': '#9146FF',  // Yahoo purple for Full-Stack
      'R': '#FF4500',  // Reddit orange for DevOps
      'T': '#0088CC',  // Telegram blue for HR
      'D': '#0062FF',  // Dropbox blue for System Design
      'S': '#1DB954',  // Spotify green for Business Analyst
      'Q': '#E93234',  // Quora red for Mobile App
    };
    
    return colorMap[icon] || '#666';
  };

  const renderPastInterviewItem = (item: Interview) => (
    <View key={item.id} style={styles.interviewCard}>
      <View style={styles.interviewHeader}>
        <View style={[styles.iconCircle, { backgroundColor: getIconBgColor(item.icon) }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        
        <View style={styles.interviewContent}>
          <Text style={styles.interviewTitle}>{item.title}</Text>
          <View style={styles.interviewMeta}>
            <Text style={styles.interviewDate}>Feb {new Date(item.date).getDate()}, {new Date(item.date).getFullYear()}</Text>
            <Text style={styles.interviewScore}>{item.score}</Text>
          </View>
          <Text style={styles.interviewDescription}>
            This interview does not reflect serious interest or engagement from the candidate.
          </Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('InterviewDetail', { interviewId: item.id })}
        >
          <Text style={styles.viewButtonText}>View Interview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderAvailableInterviewItem = (item: InterviewType) => (
    <View key={item.id} style={styles.interviewCard}>
      <View style={styles.interviewHeader}>
        <View style={[styles.iconCircle, { backgroundColor: getIconBgColor(item.icon) }]}>
          <Text style={styles.iconText}>{item.icon}</Text>
        </View>
        
        <View style={styles.interviewContent}>
          <Text style={styles.interviewTitle}>{item.title}</Text>
          <Text style={styles.interviewDescription}>
            {item.description}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.takeButton}
          onPress={() => navigation.navigate('CreateInterview', { interviewType: item.id })}
        >
          <Text style={styles.takeButtonText}>Take Interview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.header}>
        <LogoComponent size="small" />
        
        <TouchableOpacity style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/100?img=8' }} 
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Get Interview-Ready with AI-Powered Practice & Feedback
            </Text>
            <Text style={styles.heroSubtitle}>
              Practice real interview questions & get instant feedback.
            </Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate('CreateInterview')}
            >
              <Text style={styles.startButtonText}>Start an Interview</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.heroImageContainer}>
            <View style={styles.robotImagePlaceholder} />
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Past Interviews</Text>
          
          {pastInterviews.map(interview => renderPastInterviewItem(interview))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pick Your Interview</Text>
          
          {availableInterviews.map(interview => renderAvailableInterviewItem(interview))}
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
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 16,
    backgroundColor: '#1E1E2D',
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
    paddingRight: 8,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#B4B4B4',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#D0BCFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroImageContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2A2A2A',
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2969FF',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  interviewCard: {
    backgroundColor: '#1A1A25',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  interviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
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
  interviewContent: {
    flex: 1,
  },
  interviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  interviewMeta: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  interviewDate: {
    fontSize: 14,
    color: '#B4B4B4',
    marginRight: 8,
  },
  interviewScore: {
    fontSize: 14,
    color: '#B4B4B4',
  },
  interviewDescription: {
    fontSize: 14,
    color: '#B4B4B4',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
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
  viewButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  takeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#666',
  },
  takeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default DashboardScreen; 