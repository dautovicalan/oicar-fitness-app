import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { TextInput, Text, Button } from "react-native-paper";
import GoogleLogin from "../../components/GoogleLogin";
import { useRegistrationProcess } from "../../context/RegistrationProcessContext";
import { validateLoginForm } from "../../utils/FormValidatonUtils";
import { useUserContext } from "../../context/UserContext";
import { textInputStyles } from "../../styles/TextInputStyles";

export default function LoginView({ navigation }) {
  const { setBasicInfo } = useRegistrationProcess();
  const { setUserInfo } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const validateData = await validateLoginForm({ email, password });

    if (!validateData.isValid) {
      return setErrors(validateData.errors);
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5280/api/Account/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 403 || response.status === 400) {
        setLoading(false);
        return Alert.alert("Wrong email or password");
      }

      const result = await response.json();

      if (result?.isRegister && result.isRegister === true) {
        setUserInfo({
          id: result.idUser,
          accessToken: result.accessToken,
        });
        return navigation.reset({
          index: 0,
          routes: [{ name: "MainApp" }],
        });
      }

      setBasicInfo({
        id: result.idUser,
        isRegister: result.isRegister,
      });

      navigation.navigate("Register", {
        screen: "About You",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            style={textInputStyles.textInput}
            error={errors?.email}
            onChangeText={(text) => setEmail(text)}
            left={<TextInput.Icon icon="email" />}
          />
          <TextInput
            label={"Password"}
            value={password}
            style={textInputStyles.textInput}
            secureTextEntry={true}
            error={errors?.password}
            onChangeText={(text) => setPassword(text)}
            left={<TextInput.Icon icon="onepassword" />}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            icon="lock-open"
            disabled={loading}
          >
            Login
          </Button>
          <View style={styles.oauthContainer}>
            <Text variant="titleMedium" style={{ textAlign: "center" }}>
              Or login with...
            </Text>
            <View style={styles.pictureContainer}>
              <GoogleLogin navigation={navigation} />
            </View>
          </View>
          <View>
            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text variant="titleMedium" style={{ textAlign: "center" }}>
                Forgot your password?
              </Text>
            </Pressable>
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
