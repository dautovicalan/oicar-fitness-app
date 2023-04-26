import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutView from "../views/main-views/WorkoutView";
import SingleTutorialView from "../views/workout-views/SingleTutorialView";
import PersonalRecordView from "../views/workout-views/PersonalRecordView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddPRView from "../views/workout-views/AddPRView";
import ShowExercise from "../views/workout-views/ShowTutorialView";
import AddExerciseView from "../views/workout-views/AddExerciseView";
import SingleUserExerciseDetailsView from "../views/workout-views/SingleUserExerciseDetailsView";
import ShowTutorialView from "../views/workout-views/ShowTutorialView";
import AddSpecificExerciseView from "../views/workout-views/AddSpecificExerciseView";

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
      <Stack.Screen name="Add Exercise" component={AddExerciseView} />
      <Stack.Screen
        name="Add Specific Exercise"
        component={AddSpecificExerciseView}
        options={({ route }) => ({ title: "Select Exercises" })}
      />
      <Stack.Screen
        name="Show Single Exercise Details"
        component={SingleUserExerciseDetailsView}
        options={({ route }) => ({ title: route.params.exerciseName })}
      />
      <Stack.Screen name="Show Tutorials" component={ShowTutorialView} />
      <Stack.Screen
        name="Single Workouts"
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
