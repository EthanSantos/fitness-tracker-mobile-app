import React from "react";
import { Stack, Tabs, useSegments } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/ToastConfig";

export default function RootLayout() {
  const segments = useSegments();
  const currentRoute = segments.length > 0 ? segments[segments.length - 1] : "index";
  const showNavBar = currentRoute !== "index" && currentRoute !== "exercise";

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" options={{ animation: "ios_from_right" }} />
        <Stack.Screen name="exercise" />
      </Stack>

      <Toast config={toastConfig} />
    </>
  );
}
