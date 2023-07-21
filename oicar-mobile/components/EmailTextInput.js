import { View, Text } from "react-native";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";
import { emailValid } from "../utils/FormValidatonUtils";

export default function EmailTextInput({ email, setEmail }) {
  return (
    <>
      <TextInput
        label={"E-Mail"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={!emailValid(email)} padding="none">
        Email address is not valid
      </HelperText>
    </>
  );
}
