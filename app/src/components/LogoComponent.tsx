import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoComponentProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LogoComponent: React.FC<LogoComponentProps> = ({ 
  size = 'medium',
  color = '#D0BCFF'
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 32;
      default: return 26;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { color, fontSize: getFontSize() }]}>
        <Text style={styles.icon}>⟐ </Text>
        IntervuAI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    opacity: 0.8,
  }
});

export default LogoComponent; 