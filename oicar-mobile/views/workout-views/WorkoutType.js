import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";

export default function WorkoutType({ navigation }) {
  const [workoutType, setWorkoutType] = useState(true);
  const handleClick = () => {
    if (!workoutType) {
      return Alert.alert("Select Type");
    }
    navigation.navigate("Workout Sets", { workoutType });
  };

  return (
    <SafeAreaView style={style.container}>
      <Text>Workout Type</Text>
      <Button mode="contained" onPress={handleClick}>
        Next
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
