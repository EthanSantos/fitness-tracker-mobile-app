import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import "../global.css"; // Import your existing global styles

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-discord-background">
      <Text className="text-3xl font-bold text-discord-text mb-6">Home Screen</Text>
      <TouchableOpacity
        className="bg-discord-accent px-6 py-3 rounded-lg active:opacity-80"
        onPress={() => router.push('/exercise')}
      >
        <Text className="text-lg font-semibold text-white">Workouts</Text>
      </TouchableOpacity>
    </View>
  );
}
