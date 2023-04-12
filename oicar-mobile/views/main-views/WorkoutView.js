import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { Button } from "react-native-paper";
import PagerView from "react-native-pager-view";
import MyPager from "../../components/workout/MyPager";

export default function WorkoutView({ navigation }) {
  return (
    <View style={style.container}>
      <DateSlider />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Personal Records")}
      >
        Personal Records
      </Button>
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
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
