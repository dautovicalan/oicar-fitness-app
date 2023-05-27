import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutView from "../views/main-views/WorkoutView";
import SingleTutorialView from "../views/workout-views/SingleTutorialView";
import PersonalRecordView from "../views/workout-views/PersonalRecordView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddPRView from "../views/workout-views/AddPRView";
import AddWorkoutView from "../views/workout-views/AddWorkoutView";
import ShowTutorialView from "../views/workout-views/ShowTutorialView";
import AddExerciseView from "../views/workout-views/AddExerciseView";
import ShowWorkoutDetailsView from "../views/workout-views/ShowWorkoutDetailsView";
import ShowExerciseDetailsView from "../views/workout-views/ShowExerciseDetailsView";
import AddWorkoutNameView from "../views/workout-views/AddWorkoutNameView";

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
                navigation.navigate("Show Tutorials");
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Add Workout Name"
        component={AddWorkoutNameView}
        options={({ route }) => ({ title: "Add Workout Name" })}
      />
      <Stack.Screen
        name="Add Workout"
        component={AddWorkoutView}
        options={({ route }) => ({ title: "Add Workout" })}
      />
      <Stack.Screen
        name="Add Specific Exercise"
        component={AddExerciseView}
        options={({ route }) => ({ title: "Select Exercises" })}
      />
      <Stack.Screen
        name="Show Single Workout Details"
        component={ShowWorkoutDetailsView}
        options={({ route }) => ({ title: route.params.workoutName })}
      />
      <Stack.Screen
        name="Exercise Details"
        component={ShowExerciseDetailsView}
        options={({ route }) => ({ title: route.params.exerciseName })}
      />
      <Stack.Screen
        name="Show Tutorials"
        component={ShowTutorialView}
        options={({ route }) => ({ title: "Show Tutorials" })}
      />
      <Stack.Screen
        name="Single Tutorial"
        component={SingleTutorialView}
        options={() => ({
          title: "Single Tutorial",
        })}
      />
      <Stack.Screen name="Personal Records" component={PersonalRecordView} />
      <Stack.Screen name="Add Personal Record" component={AddPRView} />
    </Stack.Navigator>
  );
}
