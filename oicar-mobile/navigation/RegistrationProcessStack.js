import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutYouView from "../views/AboutYouView";
import GoalView from "../views/GoalView";
import UserInformationView from "../views/UserInformationView";
import WorkoutPerWeekSelectionView from "../views/WorkoutPerWeekSelectionView";

const Stack = createNativeStackNavigator();

export default function RegistrationProcessStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Basic Info"
        component={UserInformationView}
        options={{
          title: "Basic Info",
        }}
      />
      <Stack.Screen name="About You" component={AboutYouView} />
      <Stack.Screen name="Goal" component={GoalView} />
      <Stack.Screen name="Workouts" component={WorkoutPerWeekSelectionView} />
    </Stack.Navigator>
  );
}
