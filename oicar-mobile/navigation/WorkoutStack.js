import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutView from "../views/main-views/WorkoutView";
import AddWorkoutStack from "./AddWorkoutStack";
import ShowWorkouts from "../views/workout-views/ShowWorkouts";
import SingleWorkoutView from "../views/workout-views/SingleWorkoutView";
import PersonalRecordView from "../views/workout-views/PersonalRecordView";

const Stack = createNativeStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Workout Dashboard" component={WorkoutView} />
      <Stack.Screen name="Add Workout" component={AddWorkoutStack} />
      <Stack.Screen name="Show Workouts" component={ShowWorkouts} />
      <Stack.Screen name="Single Workouts" component={SingleWorkoutView} />
      <Stack.Screen name="Personal Records" component={PersonalRecordView} />
    </Stack.Navigator>
  );
}
