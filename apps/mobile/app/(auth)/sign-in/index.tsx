import { signInSchema } from "@repo/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import {
  Alert,
  SafeAreaView,
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

const SignInScreen = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (ctx) => {
          console.log(ctx.error);
          Alert.alert("Error", ctx.error.stack);
        },
        onSuccess: () => {
          router.push("/(root)/(drawer)/(tabs)/(home)");
        },
      },
    );
  };
  return (
    <SafeAreaView>
      <View className={"p-4"}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={field.onChange}
              className="h-12 border-1 border-gray-200 my-4 p-2 bg-white rounded-lg"
              placeholder="Email"
            />
          )}
          name="email"
          rules={{
            required: "You must enter your email",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          }}
        />
        {errors.email && (
          <Text className="text-red-500 my-2">{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              onChangeText={field.onChange}
              className="h-12 border-1 border-gray-200 my-4 p-2 bg-white rounded-lg"
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: "You must enter 8 characters password",
          }}
        />
        {errors.password && (
          <Text className="text-red-500 my-2">{errors.password.message}</Text>
        )}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="w-full bg-blue-500 rounded-lg py-4 px-8 justify-center items-center"
        >
          {form.formState.isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white text-xl font-bold">Submit</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
