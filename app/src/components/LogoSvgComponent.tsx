import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

interface LogoSvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const LogoSvgComponent: React.FC<LogoSvgProps> = ({ 
  width = 200, 
  height = 50, 
  color = '#D0BCFF' 
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 240 60" fill="none">
        <Path
          d="M30 10h180c11.046 0 20 8.954 20 20s-8.954 20-20 20H30C18.954 50 10 41.046 10 30s8.954-20 20-20z"
          fill={color}
        />
        <Path
          d="M60 20v20h-5V20h5zm10 0h5l-7.5 20h-5L55 20h5l3.75 10L67.5 20zm15 0v15h7.5v5h-12.5V20h5zm22.5 0v5h-7.5v2.5H107v5h-7.5V40h-5V20h12.5zm7.5 0v20h-5V20h5zm17.5 0v5H125v2.5h7.5v5H125v2.5h7.5v5h-12.5V20h12.5zm17.5 0v15h7.5v5h-12.5V20h5zm22.5 0v5H165v2.5h7.5v5H165v2.5h7.5v5h-12.5V20h12.5zm17.5 0v20h-5V20h5zm10 0h5l-7.5 20h-5L185 20h5l3.75 10L197.5 20z"
          fill="#121212"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LogoSvgComponent; 