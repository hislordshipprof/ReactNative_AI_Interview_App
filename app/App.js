import React, { useEffect, useRef } from 'react';
import { Linking, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import useCachedResources from './src/hooks/useCachedResources';
import { DeepLinkingConfig } from './src/lib/deepLinking';
import { ROUTES } from './src/utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a component that handles deep links inside the auth context
const DeepLinkHandler = () => {
  const { user, initialized } = useAuth();
  const navigationRef = useRef(null);
  
  // Get a reference to navigation
  useEffect(() => {
    // Share the navigation ref with other components
    global.navigationRef = navigationRef;
  }, [navigationRef]);

  useEffect(() => {
    if (!initialized) return;
    
    const navigateToDashboard = () => {
      console.log('[App] Navigating to dashboard, current user:', !!user);
      if (navigationRef.current) {
        try {
          navigationRef.current.navigate(ROUTES.DASHBOARD);
          console.log('[App] Navigation complete');
        } catch (error) {
          console.error('[App] Navigation error:', error);
        }
      }
    };
    
    // Check for pending navigation
    const checkPendingNavigation = async () => {
      try {
        const pendingNavigation = await AsyncStorage.getItem('PENDING_NAVIGATION');
        if (pendingNavigation) {
          console.log('[App] Found pending navigation to:', pendingNavigation);
          if (user) {
            navigationRef.current?.navigate(pendingNavigation);
            await AsyncStorage.removeItem('PENDING_NAVIGATION');
          }
        }
      } catch (error) {
        console.error('[App] Error checking pending navigation:', error);
      }
    };
    
    checkPendingNavigation();
    
    // Function to handle deep links
    const handleDeepLink = async (event) => {
      const url = event?.url || '';
      if (url) {
        console.log('[App] Received deep link:', url);
        await DeepLinkingConfig.handleAuthDeepLink(url, async () => {
          console.log('[App] Auth successful from deep link, saving pending navigation');
          
          // Save pending navigation to dashboard
          await AsyncStorage.setItem('PENDING_NAVIGATION', ROUTES.DASHBOARD);
          
          // If we already have a user, navigate immediately
          if (user) {
            navigateToDashboard();
          }
        });
      }
    };
    
    // Set up the listener for when the app is opened via URL
    const subscription = Linking.addEventListener('url', handleDeepLink);
    
    // Handle deep links that opened the app
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('[App] App opened with URL:', url);
        handleDeepLink({ url });
      }
    });
    
    return () => {
      subscription.remove();
    };
  }, [initialized, user]);
  
  return null;
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DeepLinkHandler />
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
