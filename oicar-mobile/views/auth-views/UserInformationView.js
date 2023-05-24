import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useRegistrationProcess } from "../../context/RegistrationProcessContext";
import { Text } from "react-native-paper";
import GoogleLogin from "../../components/GoogleLogin";
import { validateUserRegistration } from "../../utils/FormValidatonUtils";
import { textInputStyles } from "../../styles/TextInputStyles";

export default function UserInformationView({ navigation }) {
  const { setBasicInfo } = useRegistrationProcess();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState(null);

  const handleClick = async () => {
    const validatedData = await validateUserRegistration({
      name,
      surname,
      email,
      password,
      passwordRepeat,
    });

    if (!validatedData.isValid) {
      return setErrors(validatedData.errors);
    }

    try {
      setLoading(true);
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
      console.log(response);
      const result = await response.json();
      if (response.status === 400 && result.message) {
        return Alert.alert(result.message);
      }
      console.log("User id is: " + result.id);
      setBasicInfo({
        id: result.id,
        name: result.name,
        surname: result.surname,
        email: result.email,
        isRegister: result.isRegister,
      });

      Alert.alert(
        "Thank you for creating account. Continue with creating your preferances"
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "About You" }],
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
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
              style={textInputStyles.textInput}
              error={errors?.name}
              onChangeText={(text) => setName(text)}
              left={<TextInput.Icon icon="account" />}
            />
          </View>
          <View>
            <TextInput
              label={"Surname"}
              value={surname}
              style={textInputStyles.textInput}
              error={errors?.surname}
              onChangeText={(text) => setSurname(text)}
              left={<TextInput.Icon icon="account" />}
            />
          </View>
          <View>
            <TextInput
              label={"Email"}
              value={email}
              style={textInputStyles.textInput}
              error={errors?.email}
              onChangeText={(text) => setEmail(text)}
              left={<TextInput.Icon icon="email" />}
            />
          </View>
          <View>
            <TextInput
              label={"Password"}
              value={password}
              style={textInputStyles.textInput}
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
              style={textInputStyles.textInput}
              error={errors?.passwordRepeat}
              onChangeText={(text) => setPasswordRepeat(text)}
              left={<TextInput.Icon icon="lock" />}
            />
          </View>
          <View style={style.oauthConatiner}>
            <Text variant="titleMedium">Or Register With...</Text>
            <GoogleLogin />
          </View>
          <Button
            mode="contained"
            onPress={handleClick}
            icon="rocket-launch"
            disabled={loading}
          >
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
