import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Load user from storage or check if already logged in
    // This is a placeholder for actual Firebase auth persistence
    const loadStoredUser = async () => {
      try {
        // In a real app, we would load the user from async storage 
        // or Firebase Auth's persistence
        
        // Mock loading delay
        setTimeout(() => {
          // For demo purposes, we'll set the user to null (logged out)
          setUser(null);
          setIsLoading(false);
          setInitialized(true);
        }, 1000);
      } catch (error) {
        console.error('Failed to load authentication state:', error);
        setUser(null);
        setIsLoading(false);
        setInitialized(true);
      }
    };

    loadStoredUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock successful authentication
      // In a real app, we would use Firebase auth here
      setTimeout(() => {
        // Mock user data
        const userData: User = {
          id: 'user123',
          email,
          name: 'John Doe',
        };
        
        setUser(userData);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Authentication Error', 'Failed to sign in. Please check your credentials.');
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock successful registration
      // In a real app, we would use Firebase auth here
      setTimeout(() => {
        // Mock user data
        const userData: User = {
          id: 'user123',
          email,
          name,
        };
        
        setUser(userData);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Registration Error', 'Failed to create account. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Mock sign out
      // In a real app, we would use Firebase auth here
      setTimeout(() => {
        setUser(null);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        initialized,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 