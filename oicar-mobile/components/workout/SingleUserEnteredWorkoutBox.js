import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function SingleUserEnteredWorkoutBox({
  workoutName,
  workoutSets,
  workoutReps,
  workoutWeight,
  removeWorkout,
}) {
  return (
    <Pressable style={style.container} onLongPress={removeWorkout}>
      <Text>Name: {workoutName}</Text>
      <Text>Sets: {workoutSets}</Text>
      <Text>Reps: {workoutReps}</Text>
      <Text>Weight: {workoutWeight}</Text>
    </Pressable>
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
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
    marginRight: 10,
  },
});
