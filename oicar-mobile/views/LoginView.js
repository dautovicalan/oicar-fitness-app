import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import { emailValid, formValid } from "../utils/FormValidatonUtils";

export default function LoginView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (!formValid(Array.of(email, password)) && !emailValid(email)) {
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
          <TextInput
            label={"Email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            left={<TextInput.Icon icon="email" />}
          />
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
          <View>
            <Text>Or login with...</Text>
            <View>
              <Text>Google</Text>
              <Text>Facebook</Text>
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
    width: "100%",
    gap: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
});
