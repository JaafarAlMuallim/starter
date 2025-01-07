import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const RootLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }} backBehavior="history">
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
