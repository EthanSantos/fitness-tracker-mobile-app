import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import "../global.css"; 

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  
  // Responsive sizing - adjust based on screen size
  const titleSize = width < 380 ? 'text-3xl' : 'text-4xl';
  const subtitleSize = width < 380 ? 'text-sm' : 'text-base';
  const buttonTextSize = width < 380 ? 'text-lg' : 'text-xl';
  
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const buttonAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);
  
  useEffect(() => {
    // Staggered animations
    Animated.sequence([
      // Title and subtitle fade in and slide up
      Animated.spring(fadeAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }),
      // Button fades in after text appears
      Animated.spring(buttonAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  // Handle button press animations
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 4,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };
  
  // Animation styles
  const titleStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }]
  };
  
  const buttonStyle = {
    opacity: buttonAnim,
    transform: [{ scale: buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1]
    }) }]
  };

  return (
    <View 
      className="flex-1 justify-center items-center bg-discord-background px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar barStyle="light-content" />
      
      <Animated.View style={titleStyle} className="items-center">
        <Text className={`${titleSize} font-extrabold text-discord-text mb-4 text-center`}>
          Welcome to Elevate
        </Text>

        <Text className={`${subtitleSize} font-medium text-discord-muted mb-3 text-center`}>
          A fitness app developed by Ethan Santos
        </Text>
        
      </Animated.View>

      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          className="bg-discord-accent px-8 py-4 rounded-xl shadow-lg"
          onPress={() => router.push('/tabs/workouts')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.Text 
            style={{transform: [{scale: scaleAnim}]}}
            className={`${buttonTextSize} font-semibold text-white`}
          >
            Get Started
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
      
    </View>
  );
}