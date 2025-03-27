import React from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ui/ToastConfig";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="exercise" />
        <Stack.Screen name="exercise-chart" />
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
}
