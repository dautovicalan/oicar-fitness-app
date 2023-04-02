import { View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import { workoutsPerWeek } from "../data/FitnessData";

export default function WorkoutPerWeekSelectionView({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState();

  const handleClick = () => {
    if (!selectedWorkout) {
      return Alert.alert("Please select workout");
    }

    return navigation.navigate("Newsletter");
  };

  return (
    <View style={style.container}>
      {workoutsPerWeek.map((workout) => {
        return (
          <Pressable
            key={workout.id}
            onPress={() => setSelectedWorkout(workout.id)}
          >
            <Text
              variant="displayMedium"
              style={Array.of(
                style.textBorder,
                workout.id === selectedWorkout ? style.selectedBorder : null
              )}
            >
              {workout.text}
            </Text>
          </Pressable>
        );
      })}
      <Button
        mode="contained"
        style={{ width: "80%" }}
        onPress={handleClick}
        icon="rocket-launch"
      >
        Next
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textBorder: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
  selectedBorder: {
    borderColor: "red",
  },
});
