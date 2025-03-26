import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoComponent from '../../components/LogoComponent';

interface InterviewSessionScreenProps {
  navigation: any;
  route: any;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const InterviewSessionScreen: React.FC<InterviewSessionScreenProps> = ({ navigation, route }) => {
  const { 
    interviewType, 
    jobRole, 
    experienceLevel, 
    extraNotes, 
    videoRecording 
  } = route.params;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(videoRecording);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Get interview type data (in a real app, fetch from API or context)
  const getInterviewTypeName = () => {
    const types = {
      '1': 'Full-Stack Dev Interview',
      '2': 'DevOps & Cloud Interview',
      '3': 'HR Screening Interview',
      '4': 'System Design Interview',
      '5': 'Business Analyst Interview',
      '6': 'Mobile App Dev Interview',
    };
    return types[interviewType as keyof typeof types] || 'Custom Interview';
  };
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // AI initial greeting and setup
  useEffect(() => {
    const startInterview = async () => {
      // Add initial AI message
      await addAIMessage(`Hi there! I'll be conducting your ${getInterviewTypeName()} today for the ${jobRole} position at ${experienceLevel} level. ${extraNotes ? `I'll focus on: ${extraNotes}` : ''} Let's get started!`);
      
      // Add first question after a delay
      setTimeout(() => {
        addAIMessage(getNextQuestion());
      }, 1000);
    };
    
    startInterview();
  }, []);
  
  // Pulse animation for recording indicator
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
    
    return () => {
      pulseAnim.stopAnimation();
    };
  }, [isRecording]);
  
  // Add AI message with typing indicator
  const addAIMessage = async (text: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
    
    // If it's a question, increment question count
    if (text.endsWith('?')) {
      setQuestionCount(prev => prev + 1);
    }
    
    // Scroll to bottom after message is added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    // Simulate AI thinking and response
    setTimeout(async () => {
      // Add AI follow-up or next question
      if (Math.random() > 0.3) {
        // 70% chance to ask follow-up
        await addAIMessage(getFollowUp());
      } else {
        // 30% chance to move to next question
        await addAIMessage(getNextQuestion());
      }
    }, 2000);
  };
  
  // Handle ending the interview
  const handleEndInterview = () => {
    navigation.replace('InterviewFeedback', {
      interviewType,
      jobRole,
      experienceLevel,
      messages,
      duration: timeElapsed,
      questionCount,
    });
  };
  
  // Get sample questions based on interview type
  const getNextQuestion = () => {
    const technicalQuestions = [
      "Can you explain the difference between REST and GraphQL APIs?",
      "How do you approach responsive design in your projects?",
      "Explain how you would implement authentication in a React Native app.",
      "What strategies do you use for state management in frontend applications?",
      "How would you optimize the performance of a slow-loading mobile app?",
      "Describe your approach to testing in the development process.",
      "How do you handle API errors and edge cases in your applications?",
      "Can you explain the concept of code splitting and its benefits?",
      "What's your experience with CI/CD pipelines?",
      "How would you design a scalable microservice architecture?"
    ];
    
    const nonTechnicalQuestions = [
      "Tell me about a challenging project you worked on recently.",
      "How do you handle tight deadlines and changing requirements?",
      "Describe your ideal team culture and working environment.",
      "How do you approach learning new technologies?",
      "Tell me about a time you had to resolve a conflict within your team.",
      "How do you prioritize tasks when working on multiple projects?",
      "What's your approach to giving and receiving feedback?",
      "Describe a situation where you had to make a difficult decision.",
      "How do you stay up-to-date with industry trends?",
      "Where do you see yourself professionally in the next 3-5 years?"
    ];
    
    const questions = interviewType === '3' || interviewType === '5' 
      ? nonTechnicalQuestions
      : technicalQuestions;
    
    return questions[Math.floor(Math.random() * questions.length)];
  };
  
  // Get sample follow-up questions
  const getFollowUp = () => {
    const followUps = [
      "Can you elaborate more on that?",
      "That's interesting. Could you provide a specific example?",
      "How would you approach this differently if you had more resources?",
      "What challenges did you face with that approach?",
      "What were the results or outcomes?",
      "How did that experience change your perspective?",
      "What would you do differently if you could do it again?",
      "How does that compare to other methods you've used?",
      "What tools or frameworks did you use for that?",
      "How did you measure the success of that solution?"
    ];
    
    return followUps[Math.floor(Math.random() * followUps.length)];
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LogoComponent size="small" />
          <Text style={styles.headerTitle}>{getInterviewTypeName()}</Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
          </View>
          
          {isRecording && (
            <Animated.View 
              style={[
                styles.recordingIndicator,
                { transform: [{ scale: pulseAnim }] }
              ]}
            />
          )}
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            {message.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Text style={styles.aiAvatarText}>AI</Text>
              </View>
            )}
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestampText}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        ))}
        
        {isTyping && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>AI</Text>
            </View>
            <View style={styles.typingIndicator}>
              <View style={styles.typingDot} />
              <View style={[styles.typingDot, styles.typingDotMiddle]} />
              <View style={styles.typingDot} />
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your response..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]} 
          onPress={handleSend}
          disabled={!input.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.endButton}
        onPress={handleEndInterview}
      >
        <Text style={styles.endButtonText}>End Interview</Text>
      </TouchableOpacity>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerContainer: {
    backgroundColor: '#1A1A25',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  timerText: {
    color: '#fff',
    fontWeight: '600',
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3366',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  aiBubble: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2969FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  aiAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  messageContent: {
    backgroundColor: '#1A1A25',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  timestampText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: '#1A1A25',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    height: 40,
    width: 64,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginHorizontal: 2,
    opacity: 0.6,
  },
  typingDotMiddle: {
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  input: {
    flex: 1,
    backgroundColor: '#1A1A25',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#2969FF',
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: '#FF3366',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InterviewSessionScreen; 