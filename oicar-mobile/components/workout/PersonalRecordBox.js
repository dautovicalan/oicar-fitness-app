import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function PersonalRecordBox() {
  return (
    <View style={style.container}>
      <Text>PR</Text>
      <Text>Workout: Bench Press</Text>
      <Text>When: {new Date().toDateString()}</Text>
      <Text>Weight: 100 KG</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "60%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
