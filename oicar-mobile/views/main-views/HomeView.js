import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function HomeView() {
  return (
    <View style={style.container}>
      <Text>Welcome Home</Text>
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
