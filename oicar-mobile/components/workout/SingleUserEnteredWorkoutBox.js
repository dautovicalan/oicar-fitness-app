import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";

export default function SingleUserEnteredWorkoutBox({
  workoutName,
  removeWorkout,
  renderFullWidth,
}) {
  return (
    <Pressable
      style={[
        style.container,
        { width: renderFullWidth === true ? "95%" : "45%" },
      ]}
      onLongPress={removeWorkout}
    >
      <Text variant="bodySmall">Name: {workoutName}</Text>
      <Button mode="contained" onPress={() => {}}>
        Add
      </Button>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
    margin: 10,
  },
});
