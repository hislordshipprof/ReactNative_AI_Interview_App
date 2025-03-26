import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Keep the splash screen visible while we fetch resources
        await preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          // Add any fonts you need here
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        await hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
} 