import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the hooks and components that might cause issues in tests
jest.mock('../src/hooks/useCachedResources', () => {
  return () => true; // Return true to indicate resources are loaded
});

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }: any) => <View>{children}</View>,
    SafeAreaView: ({ children }: any) => <View>{children}</View>,
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }: any) => <>{children}</>,
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: () => null,
    }),
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    // This test simply checks that the app renders without throwing an error
    render(<App />);
    // If the test completes without error, we consider it a success
    expect(true).toBeTruthy();
  });
}); 