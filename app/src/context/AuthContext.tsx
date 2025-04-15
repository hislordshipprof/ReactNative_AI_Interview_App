import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { DeepLinkingConfig } from '../lib/deepLinking';

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
    // Check for existing Supabase session and subscribe to auth changes
    const loadUser = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          await handleSession(session);
        }
        
        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            if (session) {
              await handleSession(session);
            } else {
              setUser(null);
            }
          }
        );

        setIsLoading(false);
        setInitialized(true);

        // Cleanup subscription on unmount
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Failed to load authentication state:', error);
        setUser(null);
        setIsLoading(false);
        setInitialized(true);
      }
    };

    loadUser();
  }, []);

  // Helper function to get user profile data and set the user state
  const handleSession = async (session: Session) => {
    // Get user profile data from Supabase
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }

    setUser({
      id: session.user.id,
      email: session.user.email || '',
      name: profile?.name || '',
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Authentication Error', error.message || 'Failed to sign in');
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: DeepLinkingConfig.redirectUrl,
        },
      });
      
      if (error) {
        throw error;
      }
      
      Alert.alert('Success', 'Registration successful! Please verify your email to continue.');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Registration Error', error.message || 'Failed to create account');
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Error', error.message || 'Failed to sign out');
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