import React from "react";
import { Stack, useSegments } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastConfig";
import NavigationBar from "./components/NavigationBar";

export default function RootLayout() {
  const segments = useSegments();
  const currentRoute = segments.length > 0 ? segments[segments.length - 1] : 'index';
  const showNavBar = currentRoute !== 'index' && currentRoute !== 'exercise';

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="workouts" options={{ animation: 'ios_from_left' }} />
        <Stack.Screen name="exercise" />
        <Stack.Screen name="profile" options={{ animation: 'ios_from_right' }} />
      </Stack>


      <NavigationBar visible={showNavBar} />

      <Toast config={toastConfig} />
    </>
  );
}
