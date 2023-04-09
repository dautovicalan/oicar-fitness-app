import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function DietView() {
  return (
    <View style={style.container}>
      <Text>Track Your Diet Here</Text>
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
