import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { authClient } from "@/lib/auth-client";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ headerShown: false }}
        backBehavior="history"
        drawerContent={() => <CustomDrawerContent />}
      >
        <Drawer.Screen
          name="index"
          options={{
            headerShown: true,
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="another-page"
          options={{
            title: "Another Page",
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

const CustomDrawerContent = () => {
  const pathname = usePathname();
  return (
    <DrawerContentScrollView className="h-full">
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        label={"Home"}
        style={{ backgroundColor: pathname == "/index" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/(root)/(drawer)");
        }}
      />

      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons name="paper-plane" size={size} color={color} />
        )}
        label={"Another Page"}
        style={{
          backgroundColor: pathname == "/another-page" ? "#333" : "#fff",
        }}
        onPress={() => {
          router.push("/(root)/(drawer)/another-page");
        }}
      />
      <Pressable
        onPress={() => {
          authClient.signOut();
        }}
        className="my-20 p-4 justify-self-end"
      >
        <View className="flex flex-row flex-1 items-center">
          <Ionicons name="log-out" size={40} color={"#C21D1A"} />
          <View className="flex flex-col ml-4">
            <Text className="text-red-500 font-bold text-xl">Log Out</Text>
          </View>
        </View>
      </Pressable>
    </DrawerContentScrollView>
  );
};
export default RootLayout;
