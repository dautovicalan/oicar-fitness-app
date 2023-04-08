import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SingleWorkoutBox() {
  return (
    <View style={style.container}>
      <Text>Single Workout Box</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "45%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
