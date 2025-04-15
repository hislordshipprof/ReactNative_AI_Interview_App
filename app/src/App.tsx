import * as React from 'react';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DeepLinkingConfig } from './lib/deepLinking';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from './utils/constants';

// Your existing App component
const App = () => {
  const navigationRef = React.useRef(null);

  React.useEffect(() => {
    // Function to handle deep links
    const handleDeepLink = async (event) => {
      const { url } = event;
      if (url) {
        // Pass a callback to navigate to Dashboard on success
        await DeepLinkingConfig.handleAuthDeepLink(url, () => {
          // Only navigate if the navigationRef is ready
          if (navigationRef.current) {
            // @ts-ignore - navigationRef.current will not be null here
            navigationRef.current.navigate(ROUTES.DASHBOARD);
          }
        });
      }
    };

    // Set up linking listeners
    Linking.addEventListener('url', handleDeepLink);

    // Handle deep links that opened the app
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Clean up
    return () => {
      // Remove event listener (for React Native versions < 0.65)
      // For newer RN versions, the addEventListener returns a subscription object
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {/* Your app's navigation structure */}
    </NavigationContainer>
  );
};

export default App; 