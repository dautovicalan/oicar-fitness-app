import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function SettingsView({ navigation }) {
  return (
    <View style={style.container}>
      <Button mode="contained">Logout</Button>
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
