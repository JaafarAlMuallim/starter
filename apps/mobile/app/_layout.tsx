import { Stack } from "expo-router";
import "../global.css";
import { TRPCProvider } from "@/lib/trpc-client";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar, useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TRPCProvider>
        <StatusBar />
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(root)" />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </TRPCProvider>
    </ThemeProvider>
  );
}
