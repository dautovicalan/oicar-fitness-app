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
import { userValidationSchema } from "../schema/ValidationSchemas";

export default function UserInformationView({ navigation }) {
  const { setBasicInfo } = useRegistrationProcess();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [errors, setErrors] = useState(null);

  const handleClick = async () => {
    userValidationSchema
      .validate(
        { name, surname, email, password, passwordRepeat },
        { abortEarly: false }
      )
      .then(() => {
        // do the rest
        Alert.alert("Success");
      })
      .catch((err) => {
        const tempErrors = {};
        err.inner.forEach((e) => {
          tempErrors[e.path] = e.message;
        });
        setErrors(tempErrors);
      });

    // call API
    // try {
    //   const response = await fetch(
    //     "http://localhost:5280/api/Account/Register",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ name, surname, email, password }),
    //     }
    //   );
    //   const result = await response.json();
    //   setBasicInfo({
    //     name: result.name,
    //     surname: result.surname,
    //     email: result.email,
    //   });

    //   return navigation.navigate("About You");
    // } catch (error) {
    //   console.error(error);
    //   setError(error.message);
    // }

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
              error={errors?.name}
              onChangeText={(text) => setName(text)}
              left={<TextInput.Icon icon="account" />}
            />
          </View>
          <View>
            <TextInput
              label={"Surname"}
              value={surname}
              error={errors?.surname}
              onChangeText={(text) => setSurname(text)}
              left={<TextInput.Icon icon="account" />}
            />
          </View>
          <View>
            <TextInput
              label={"Email"}
              value={email}
              error={errors?.email}
              onChangeText={(text) => setEmail(text)}
              left={<TextInput.Icon icon="email" />}
            />
          </View>
          <View>
            <TextInput
              label={"Password"}
              value={password}
              secureTextEntry={true}
              error={errors?.password}
              onChangeText={(text) => setPassword(text)}
              left={<TextInput.Icon icon="lock" />}
            />
          </View>
          <View>
            <TextInput
              label={"Repeat Password"}
              value={passwordRepeat}
              secureTextEntry={true}
              error={errors?.passwordRepeat}
              onChangeText={(text) => setPasswordRepeat(text)}
              left={<TextInput.Icon icon="lock" />}
            />
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
