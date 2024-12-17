import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastConfig";

export default function RootLayout() {

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="workouts" />
        <Stack.Screen name="exercise" />
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
}
