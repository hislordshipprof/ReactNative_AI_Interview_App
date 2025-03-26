import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoComponent from '../../components/LogoComponent';

interface CreateInterviewScreenProps {
  navigation: any;
  route: any;
}

interface InterviewType {
  id: string;
  title: string;
  status: 'Technical' | 'Non-Technical';
  description: string;
}

const CreateInterviewScreen: React.FC<CreateInterviewScreenProps> = ({ navigation, route }) => {
  const selectedInterviewTypeId = route.params?.interviewType;
  
  // Interview types data (normally would be fetched from API)
  const interviewTypes: InterviewType[] = [
    {
      id: '1',
      title: 'Full-Stack Dev Interview',
      status: 'Technical',
      description: 'A comprehensive interview covering both frontend and backend technologies.',
    },
    {
      id: '2',
      title: 'DevOps & Cloud Interview',
      status: 'Technical',
      description: 'Focus on infrastructure, deployment, and cloud technologies.',
    },
    {
      id: '3',
      title: 'HR Screening Interview',
      status: 'Non-Technical',
      description: 'Initial screening interview focusing on cultural fit and basic qualifications.',
    },
    {
      id: '4',
      title: 'System Design Interview',
      status: 'Technical',
      description: 'Tests your ability to design scalable and efficient systems.',
    },
    {
      id: '5',
      title: 'Business Analyst Interview',
      status: 'Non-Technical',
      description: 'Evaluates your ability to analyze business requirements and translate them to technical needs.',
    },
    {
      id: '6',
      title: 'Mobile App Dev Interview',
      status: 'Technical',
      description: 'Tests your knowledge of mobile app development technologies and practices.',
    },
  ];
  
  const [selectedType, setSelectedType] = useState<string | null>(selectedInterviewTypeId || null);
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level');
  const [extraNotes, setExtraNotes] = useState('');
  const [videoRecording, setVideoRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Set default interview type based on route params
  useEffect(() => {
    if (selectedInterviewTypeId) {
      setSelectedType(selectedInterviewTypeId);
    }
  }, [selectedInterviewTypeId]);
  
  const experienceLevels = [
    'Entry-Level',
    'Mid-Level',
    'Senior',
    'Lead',
    'Architect',
  ];
  
  const handleStartInterview = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select an interview type');
      return;
    }
    
    if (!jobRole.trim()) {
      Alert.alert('Error', 'Please enter a job role');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('InterviewSession', {
        interviewType: selectedType,
        jobRole,
        experienceLevel,
        extraNotes,
        videoRecording,
      });
    }, 1500);
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
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Create Your Interview</Text>
        <Text style={styles.subtitle}>Customize your interview session below</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>1. Select Interview Type</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.interviewTypesContainer}
          >
            {interviewTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.interviewTypeCard,
                  selectedType === type.id && styles.selectedInterviewType,
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <View style={[
                  styles.interviewTypeBadge,
                  { backgroundColor: type.status === 'Technical' ? '#2D2B55' : '#3A3347' }
                ]}>
                  <Text style={styles.interviewTypeBadgeText}>{type.status}</Text>
                </View>
                <Text style={styles.interviewTypeTitle}>{type.title}</Text>
                <Text style={styles.interviewTypeDescription}>{type.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>2. Job Role</Text>
          <TextInput
            style={styles.input}
            value={jobRole}
            onChangeText={setJobRole}
            placeholder="e.g. Frontend Developer, UX Designer"
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>3. Experience Level</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.experienceLevelsContainer}
          >
            {experienceLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.experienceLevelButton,
                  experienceLevel === level && styles.selectedExperienceLevel,
                ]}
                onPress={() => setExperienceLevel(level)}
              >
                <Text 
                  style={[
                    styles.experienceLevelText,
                    experienceLevel === level && styles.selectedExperienceLevelText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>4. Additional Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={extraNotes}
            onChangeText={setExtraNotes}
            placeholder="Add any specific areas you want to focus on..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Enable Video Recording</Text>
            <Switch
              value={videoRecording}
              onValueChange={setVideoRecording}
              trackColor={{ false: '#444', true: '#2969FF' }}
              thumbColor={videoRecording ? '#fff' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.switchHelper}>
            Recording your interview allows for more accurate feedback on verbal and non-verbal communication
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={handleStartInterview}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.startButtonText}>Start Interview</Text>
          )}
        </TouchableOpacity>
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
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#B4B4B4',
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  interviewTypesContainer: {
    paddingBottom: 8,
  },
  interviewTypeCard: {
    backgroundColor: '#1A1A25',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 250,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedInterviewType: {
    borderColor: '#2969FF',
  },
  interviewTypeBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  interviewTypeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  interviewTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  interviewTypeDescription: {
    fontSize: 14,
    color: '#B4B4B4',
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#1A1A25',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  textArea: {
    height: 120,
  },
  experienceLevelsContainer: {
    paddingBottom: 8,
  },
  experienceLevelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#1A1A25',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  selectedExperienceLevel: {
    backgroundColor: '#2969FF',
    borderColor: '#2969FF',
  },
  experienceLevelText: {
    color: '#fff',
    fontWeight: '500',
  },
  selectedExperienceLevelText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  switchHelper: {
    fontSize: 14,
    color: '#B4B4B4',
  },
  startButton: {
    backgroundColor: '#D0BCFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  startButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateInterviewScreen; 