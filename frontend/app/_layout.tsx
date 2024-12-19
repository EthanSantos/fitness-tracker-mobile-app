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
        <Stack.Screen name="workouts" />
        <Stack.Screen name="exercise" />
      </Stack>

      <NavigationBar visible={showNavBar} />

      <Toast config={toastConfig} />
    </>
  );
}
