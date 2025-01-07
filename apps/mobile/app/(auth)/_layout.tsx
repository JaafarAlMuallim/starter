import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-up/index"
        options={{
          headerShown: true,
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="sign-in/index"
        options={{
          headerShown: true,
          title: "Sign In",
        }}
      />
    </Stack>
  );
};

export default Layout;
