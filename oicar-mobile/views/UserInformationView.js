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
import EmailTextInput from "../components/EmailTextInput";
import GoogleLogin from "../components/GoogleLogin";

export default function UserInformationView({ navigation }) {
  const { setBasicInfo } = useRegistrationProcess();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleClick = async () => {
    if (!formValid(Array.of(name, email, password, passwordRepeat))) {
      Alert.alert("Please fill form");
    }

    // call API
    try {
      const response = await fetch(
        "http://localhost:5280/api/Account/Register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, surname, email, password }),
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    // setBasicInfo({ name, surname, email, password });

    //return navigation.navigate("About You");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.innerContainer}>
          <View>
            <TextInput
              label={"Name"}
              value={name}
              onChangeText={(text) => setName(text)}
              left={<TextInput.Icon icon="account" />}
            />
            <HelperText type="error" visible={!formValid(Array.of(name))}>
              Cannot be empty
            </HelperText>
          </View>
          <View>
            <TextInput
              label={"Surname"}
              value={surname}
              onChangeText={(text) => setSurname(text)}
              left={<TextInput.Icon icon="account" />}
            />
            <HelperText type="error" visible={!formValid(Array.of(surname))}>
              Cannot be empty
            </HelperText>
          </View>
          <View>
            <EmailTextInput email={email} setEmail={setEmail} />
          </View>
          <View>
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
          <View style={style.oauthConatiner}>
            <Text variant="titleMedium">Or Register With...</Text>
            <GoogleLogin />
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
    width: "90%",
    gap: 10,
  },
  oauthConatiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  combinedFields: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
