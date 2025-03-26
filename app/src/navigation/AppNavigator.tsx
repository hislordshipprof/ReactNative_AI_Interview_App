import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Dashboard Screen
import DashboardScreen from '../screens/dashboard/DashboardScreen';

// Interview Screens
import CreateInterviewScreen from '../screens/interview/CreateInterviewScreen';
import InterviewSessionScreen from '../screens/interview/InterviewSessionScreen';
import InterviewFeedbackScreen from '../screens/interview/InterviewFeedbackScreen';
import InterviewDetailScreen from '../screens/interview/InterviewDetailScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="InterviewDetail" component={InterviewDetailScreen} />
      <Stack.Screen name="CreateInterview" component={CreateInterviewScreen} />
      <Stack.Screen name="InterviewSession" component={InterviewSessionScreen} />
      <Stack.Screen name="InterviewFeedback" component={InterviewFeedbackScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { user, initialized } = useAuth();

  // Handle the loading state when Firebase is initializing
  if (!initialized) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator; 