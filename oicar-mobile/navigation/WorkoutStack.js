import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutView from "../views/main-views/WorkoutView";
import SingleWorkoutView from "../views/workout-views/SingleWorkoutView";
import PersonalRecordView from "../views/workout-views/PersonalRecordView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddWorkoutView from "../views/workout-views/AddWorkoutView";
import AddPRView from "../views/workout-views/AddPRView";
import ShowExercise from "../views/workout-views/ShowExercise";

const Stack = createNativeStackNavigator();

export default function WorkoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workout Dashboard"
        component={WorkoutView}
        options={({ navigation }) => ({
          title: "Workouts",
          headerLeft: () => (
            <Icon.Button
              name="weight"
              iconStyle={{ justifyContent: "center", alignItems: "center" }}
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
              iconStyle={{ justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                navigation.navigate("Show Exercise");
              }}
            />
          ),
        })}
      />
      <Stack.Screen name="Add Workout" component={AddWorkoutView} />
      <Stack.Screen name="Show Workout" component={AddWorkoutView} />
      <Stack.Screen name="Show Exercise" component={ShowExercise} />
      <Stack.Screen
        name="Single Workouts"
        component={SingleWorkoutView}
        options={() => ({
          title: "Workout Tutorial",
        })}
      />
      <Stack.Screen name="Personal Records" component={PersonalRecordView} />
      <Stack.Screen name="Add Personal Record" component={AddPRView} />
    </Stack.Navigator>
  );
}
