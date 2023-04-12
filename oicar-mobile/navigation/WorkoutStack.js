import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutView from "../views/main-views/WorkoutView";
import ShowWorkouts from "../views/workout-views/ShowWorkouts";
import SingleWorkoutView from "../views/workout-views/SingleWorkoutView";
import PersonalRecordView from "../views/workout-views/PersonalRecordView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddWorkoutView from "../views/workout-views/AddWorkoutView";

const Stack = createNativeStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workout Dashboard"
        component={WorkoutView}
        options={({ navigation }) => ({
          title: "Show Workouts",
          headerLeft: () => (
            <Icon.Button
              name="weight"
              backgroundColor={"#000"}
              onPress={() => {
                navigation.navigate("Personal Records");
              }}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="help"
              backgroundColor={"#000"}
              onPress={() => {
                navigation.navigate("Show Workouts");
              }}
            />
          ),
        })}
      />
      <Stack.Screen name="Add Workout" component={AddWorkoutView} />
      <Stack.Screen name="Show Workouts" component={ShowWorkouts} />
      <Stack.Screen name="Single Workouts" component={SingleWorkoutView} />
      <Stack.Screen name="Personal Records" component={PersonalRecordView} />
    </Stack.Navigator>
  );
}
