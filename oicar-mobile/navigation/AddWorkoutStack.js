import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutType from "../views/workout-views/WorkoutType";
import WorkoutSets from "../views/workout-views/WorkoutSets";
import WorkoutRepetition from "../views/workout-views/WorkoutRepetition";
import WorkoutWeight from "../views/workout-views/WorkoutWeight";

const Stack = createNativeStackNavigator();

export default function AddWorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Workout Type" component={WorkoutType} />
      <Stack.Screen name="Workout Sets" component={WorkoutSets} />
      <Stack.Screen name="Workout Repetition" component={WorkoutRepetition} />
      <Stack.Screen name="Workout Weight" component={WorkoutWeight} />
    </Stack.Navigator>
  );
}
