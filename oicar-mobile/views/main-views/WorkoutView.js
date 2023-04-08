import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import DateSlider from "../../components/workout/DateSlider";
import { Button } from "react-native-paper";

export default function WorkoutView({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <Text>Your Workouts</Text>
      <DateSlider />
      <Text variant="displaySmall">View for selected workout</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Add Workout")}
      >
        Enter Workout For Today
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Show Workouts")}
      >
        Show Workouts
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
