import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { emailValid } from "../../utils/FormValidatonUtils";

export default function ForgotYourPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setErrors(false);
    const validationResult = emailValid(email);
    if (!validationResult) {
      return setErrors(true);
    }
    // fetch API
    try {
      const request = await fetch(
        "http://localhost:5280/api/Account/ForgotPassword?email=" + email,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (request.ok === false) {
        return Alert.alert("Error", "Something went wrong");
      }
      Alert.alert("Success", "Check your email for further instructions", [
        {
          text: "OK",
          onPress: () => {
            setEmail("");
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Text variant="titleLarge">Forgot Your Password</Text>
      <TextInput
        label={"Enter your email"}
        value={email}
        error={errors}
        onChangeText={(text) => setEmail(text)}
        style={{ width: "90%" }}
        left={<TextInput.Icon icon="email" />}
      />
      <Button mode="contained" onPress={handleClick} disabled={loading}>
        Reset your password
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
