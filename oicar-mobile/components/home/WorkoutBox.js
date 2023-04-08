import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function WorkoutBox() {
  return (
    <View style={style.container}>
      <Text>Workout this week</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    backgroundColor: "#3FBD86",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
