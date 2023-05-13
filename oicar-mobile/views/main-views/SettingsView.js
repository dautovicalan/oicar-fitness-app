import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { UserContext, useUserContext } from "../../context/UserContext";

export default function SettingsView({ navigation }) {
  const { logout } = useUserContext();
  return (
    <View style={style.container}>
      <Button
        mode="contained"
        onPress={() => {
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
      >
        Logout
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
