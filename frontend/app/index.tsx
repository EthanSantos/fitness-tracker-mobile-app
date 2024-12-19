import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import "../global.css"; 

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-discord-background px-6">
      <Text className="text-4xl font-extrabold text-discord-text mb-4 text-center">
        Welcome to Fitness Tracker
      </Text>

      <Text className="text-base font-medium text-discord-muted mb-10 text-center">
        A fitness app developed by Ethan Santos
      </Text>

      <TouchableOpacity
        className="bg-discord-accent px-8 py-4 rounded-xl active:opacity-80 shadow-lg"
        onPress={() => router.push('/tabs/workouts')}
      >
        <Text className="text-xl font-semibold text-white">View Workouts</Text>
      </TouchableOpacity>
    </View>
  );
}
