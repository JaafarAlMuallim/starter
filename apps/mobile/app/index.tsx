import { Pressable, Text, View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function Index() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <View className="flex justify-center items-center flex-1 gap-8">
        <Text className="text-3xl font-semibold">Welcome to Monorepo</Text>
        <Pressable
          onPress={() => router.push("/(auth)/sign-up")}
          className="bg-blue-500 rounded-lg w-64 py-4 px-8 justify-center items-center"
        >
          <Text className="text-xl font-semibold text-white">Sign Up</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/(auth)/sign-in")}
          className="bg-blue-500 rounded-lg w-64 py-4 px-8 justify-center items-center"
        >
          <Text className="text-xl font-semibold text-white">Sign In</Text>
        </Pressable>
      </View>
    );
  }
  return <Redirect href="/(root)/(drawer)/(tabs)/(home)" />;
}
