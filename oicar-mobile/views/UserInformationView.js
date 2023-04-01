import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { formValid } from "../utils/FormValidatonUtils";
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
    <SafeAreaView style={style.container}>
      <Text variant="displaySmall">Tell Us About You</Text>
      <View style={style.formContainer}>
        <TextInput
          label={"Name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label={"Surname"}
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          label={"E-Mail"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label={"Password"}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          label={"Repeat Password"}
          value={passwordRepeat}
          secureTextEntry={true}
          onChangeText={(text) => setPasswordRepeat(text)}
        />
        <Button mode="contained" onPress={handleClick}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    gap: 20,
  },
});
