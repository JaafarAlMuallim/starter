import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";
const HomeScreen = () => {
  const { data: session } = authClient.useSession();
  if (!session) return <Redirect href="/(auth)/sign-in" />;
  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-64 w-80 px-4 mx-8 bg-gray-800 flex flex-col justify-center items-center w-full rounded-md gap-8">
        <Avatar
          alt={"Avatar"}
          className="w-10 h-10 rounded-full border-2 border-black bg-purple-500"
        >
          <AvatarImage source={{ uri: session.user.image || "" }} />
          <AvatarFallback>
            <Text className="text-white">{session.user.name[0]}</Text>
          </AvatarFallback>
        </Avatar>
        <View className="flex flex-col justify-between items-center w-64">
          <Text className="text-white">{session.user.name}</Text>
          <Text className="text-gray-400">{session.user.email}</Text>
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
