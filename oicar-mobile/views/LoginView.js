import { View, StyleSheet, Alert, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { TextInput, Text, Button } from "react-native-paper";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email.trim().length == 0) {
      return Alert.alert("Email emptry");
    }

    console.log("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text variant="displayLarge" style={{ textAlign: "center" }}>
          Login
        </Text>
        <TextInput
          label={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label={"Password"}
          value={password}
          caretHidden
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </SafeAreaView>
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
});
