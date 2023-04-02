import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import {
  emailValid,
  formValid,
  isPasswordMatch,
} from "../utils/FormValidatonUtils";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";
import { Text } from "react-native-paper";

export default function UserInformationView({ navigation }) {
  const { setBasicInfo } = useRegistrationProcess();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleClick = async () => {
    if (!formValid(Array.of(name, surname, email, password, passwordRepeat))) {
      Alert.alert("Please fill form");
    }

    // call API

    setBasicInfo({ name, surname, email, password });

    return navigation.navigate("About You");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.innerContainer}>
          <View style={style.combinedFields}>
            <TextInput
              label={"Name"}
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ width: "45%" }}
              left={<TextInput.Icon icon="account" />}
            />
            <TextInput
              label={"Surname"}
              value={surname}
              onChangeText={(text) => setSurname(text)}
              style={{ width: "45%" }}
              left={<TextInput.Icon icon="account" />}
            />
          </View>

          <View>
            <TextInput
              label={"E-Mail"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              left={<TextInput.Icon icon="email" />}
            />
            <HelperText type="error" visible={!emailValid(email)}>
              Email address is invalid
            </HelperText>
          </View>
          <View style={{ backgroundColor: "red" }}>
            <TextInput
              label={"Password"}
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              left={<TextInput.Icon icon="lock" />}
            />
          </View>
          <View>
            <TextInput
              label={"Repeat Password"}
              value={passwordRepeat}
              secureTextEntry={true}
              onChangeText={(text) => setPasswordRepeat(text)}
              left={<TextInput.Icon icon="lock" />}
            />
            <HelperText
              type="error"
              visible={!isPasswordMatch(password, passwordRepeat)}
            >
              Passwords do not match
            </HelperText>
          </View>
          <Button mode="contained" onPress={handleClick} icon="rocket-launch">
            Next
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
  },
  combinedFields: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
