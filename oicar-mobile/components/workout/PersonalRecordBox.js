import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function PersonalRecordBox({
  workoutDate,
  workoutName,
  workoutWeight,
  renderFullWidth,
}) {
  return (
    <View
      style={[
        style.container,
        { width: renderFullWidth === true ? "95%" : "45%" },
      ]}
    >
      <Text>PR: {workoutDate}</Text>
      <Text>Workout: {workoutName}</Text>
      <Text>Weight: {workoutWeight} KG</Text>
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
    alignItems: "flex-start",
    gap: 5,
    margin: 8,
  },
});
