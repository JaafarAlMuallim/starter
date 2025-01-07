import { signUpSchema } from "@repo/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import {
  Alert,
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onError: (ctx) => {
          Alert.alert("Error", ctx.error.message);
        },
        onSuccess: () => {
          router.push("/(root)/(drawer)/(tabs)/(home)");
        },
      },
    );
  };
  return (
    <View className={"p-4"}>
      {/* Form Girdileri */}
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            onChangeText={field.onChange}
            className="h-12 border-1 border-gray-200 my-4 p-2 bg-white rounded-lg"
            placeholder="Your Name"
          />
        )}
        name="name"
        rules={{ required: "You must enter your name" }}
      />
      {errors.name && (
        <Text className="text-red-500 my-2">{errors.name.message}</Text>
      )}

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
      <Pressable onPress={handleSubmit(onSubmit)}>
        {form.formState.isSubmitting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-white">Submit</Text>
        )}
      </Pressable>
    </View>
  );
};

export default SignUpScreen;
