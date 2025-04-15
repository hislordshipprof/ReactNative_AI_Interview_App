import React, { forwardRef, useImperativeHandle } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

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
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = forwardRef((props, ref) => {
  const { user, initialized } = useAuth();
  const navigationRef = React.useRef(null);
  
  // Forward navigation methods to the parent component
  useImperativeHandle(ref, () => ({
    navigate: (name, params) => {
      if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
      }
    },
    dispatch: (action) => {
      if (navigationRef.current) {
        navigationRef.current.dispatch(action);
      }
    },
    reset: (state) => {
      if (navigationRef.current) {
        navigationRef.current.reset(state);
      }
    }
  }));

  if (!initialized) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="CreateInterview" component={CreateInterviewScreen} />
            <Stack.Screen name="InterviewSession" component={InterviewSessionScreen} />
            <Stack.Screen name="InterviewFeedback" component={InterviewFeedbackScreen} />
            <Stack.Screen name="InterviewDetail" component={InterviewDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator; 