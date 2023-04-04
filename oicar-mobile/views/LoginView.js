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

export default function LoginView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (!formValid(Array.of(email, password))) {
      return Alert.alert("Form not valid");
    }

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
          <EmailTextInput email={email} setEmail={setEmail} />
          <TextInput
            label={"Password"}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            left={<TextInput.Icon icon="onepassword" />}
          />
          {error && <Text>{error}</Text>}
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
