import { Textarea } from "@/components/ui/textarea";
import { chirpSchema } from "@repo/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import {
  Alert,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Redirect } from "expo-router";
import { api } from "@/lib/trpc-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLiveChirps } from "@/hooks/use-live-chirps";

const HomeScreen = () => {
  const { data: session } = authClient.useSession();
  const form = useForm<z.infer<typeof chirpSchema>>({
    resolver: zodResolver(chirpSchema),
    defaultValues: {
      chirp: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const utils = api.useUtils();
  const { chirps: liveChirps } = useLiveChirps();
  const { mutate: addChirp } = api.chirp.addChirp.useMutation({
    onSuccess: () => {
      utils.chirp.getChirps.invalidate();
      utils.chirp.infinite.invalidate();
    },
    onError: (ctx) => {
      console.log(ctx);
      Alert.alert("Error", ctx.message);
    },
  });
  const onSubmit = async (data: z.infer<typeof chirpSchema>) => {
    addChirp(data);
    form.reset();
  };

  if (!session) return <Redirect href="/(auth)/sign-in" />;

  return (
    <View className={"p-4"}>
      <Controller
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Write some chirps ..."
            className="h-20 border-1 border-gray-200 my-4 p-2 bg-white rounded-lg"
            onChangeText={field.onChange}
          />
        )}
        name="chirp"
        rules={{ required: "You must enter your name" }}
      />
      {errors.chirp && (
        <Text className="text-red-500 my-2">{errors.chirp.message}</Text>
      )}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 rounded-lg py-2 px-8 justify-center items-center"
      >
        {form.formState.isSubmitting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white text-xl">Submit</Text>
        )}
      </Pressable>
      <ScrollView>
        {liveChirps &&
          liveChirps.map((chirp) => {
            return (
              <Card className="w-full max-w-sm my-4" key={chirp.id}>
                <CardHeader>
                  <View className="flex flex-row justify-start items-center gap-4 my-4">
                    <Avatar
                      alt={"Avatar"}
                      className="w-10 h-10 rounded-full border-2 border-black bg-purple-500"
                    >
                      <AvatarImage source={{ uri: session.user.image || "" }} />
                      <AvatarFallback>
                        <Text className="text-white">
                          {session.user.name[0]}
                        </Text>
                      </AvatarFallback>
                    </Avatar>
                    <Text>{session.user.name}</Text>
                  </View>
                </CardHeader>
                <CardContent>
                  <Text>{chirp.chirp}</Text>
                </CardContent>
                <CardFooter>
                  <Text className="text-gray-400">
                    {new Date(chirp.updated_at).toLocaleString()}
                  </Text>
                </CardFooter>
              </Card>
            );
          })}
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
