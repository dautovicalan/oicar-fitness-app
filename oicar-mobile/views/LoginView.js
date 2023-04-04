import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { emailValid, formValid } from "../utils/FormValidatonUtils";
import EmailTextInput from "../components/EmailTextInput";
import * as Google from "expo-auth-session/providers/google";
import GoogleLogin from "../components/GoogleLogin";
import { userValidationSchema } from "../schema/ValidationSchemas";

export default function LoginView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleLogin = () => {
    userValidationSchema
      .validate({ email, password }, { abortEarly: false })
      .then(() => {
        // rest
        Alert.alert("Success");
      })
      .catch((err) => {
        const tempErrors = {};
        err.inner.forEach((e) => {
          tempErrors[e.path] = e.message;
        });
        setErrors(tempErrors);
      });

    // call API for login

    // set User Context for a application

    // navigate to home

    navigation.reset({
      index: 0,
      routes: [{ name: "MainApp" }],
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text variant="displayLarge" style={{ textAlign: "center" }}>
            Login
          </Text>
          <TextInput
            label={"Email"}
            value={email}
            error={errors?.email}
            onChangeText={(text) => setEmail(text)}
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            label={"Password"}
            value={password}
            secureTextEntry={true}
            error={errors?.password}
            onChangeText={(text) => setPassword(text)}
            left={<TextInput.Icon icon="onepassword" />}
          />
          <Button mode="contained" onPress={handleLogin} icon="lock-open">
            Login
          </Button>
          <View style={styles.oauthContainer}>
            <Text variant="titleMedium" style={{ textAlign: "center" }}>
              Or login with...
            </Text>
            <View style={styles.pictureContainer}>
              <GoogleLogin />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    gap: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  oauthContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
