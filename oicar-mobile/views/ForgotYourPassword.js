import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { userValidationSchema } from "../schema/ValidationSchemas";

export default function ForgotYourPassword() {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    userValidationSchema
      .validate({ email })
      .then(() => {
        Alert.alert("Success");
      })
      .catch((err) => {});
  };

  return (
    <View style={style.container}>
      <Text>ForgotYourPassword</Text>
      <TextInput
        label={"Enter your email"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ width: "90%" }}
        left={<TextInput.Icon icon="email" />}
      />
      <Button mode="contained" onPress={handleClick}>
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
    gap: 10,
  },
});
