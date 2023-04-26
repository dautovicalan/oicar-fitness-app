import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { validateWorkoutForm } from "../../utils/FormValidatonUtils";
import ExerciseMuscleBox from "../../components/workout/ExerciseMuscleBox";

const muscleGroups = ["chest", "back", "shoulders", "legs", "arms"];

export default function AddExerciseView({ route, navigation }) {
  const { addWorkout } = route.params;

  return (
    <FlatList
      contentContainerStyle={style.container}
      data={muscleGroups}
      renderItem={(item) => (
        <ExerciseMuscleBox
          muscleId
          muscleName={item.item}
          navigation={() => navigation.navigate("Add Specific Exercise")}
        />
      )}
      keyExtractor={(item) => item}
    />
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
