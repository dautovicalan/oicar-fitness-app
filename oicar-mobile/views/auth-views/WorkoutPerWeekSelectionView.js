import { View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import { workoutsPerWeek } from "../../data/FitnessData";

export default function WorkoutPerWeekSelectionView({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState();

  const handleClick = () => {
    if (!selectedWorkout) {
      return Alert.alert("Please select one workout");
    }

    return navigation.navigate("Newsletter", {
      workoutNumberPerWeek: selectedWorkout,
    });
  };

  return (
    <View style={style.container}>
      {workoutsPerWeek.map((workout) => {
        return (
          <Pressable
            key={workout.id}
            onPress={() => setSelectedWorkout(workout.id)}
            style={style.innerItem}
          >
            <Text
              variant="displayMedium"
              style={Array.of(
                style.itemText,
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
  innerItem: {
    width: "90%",
  },
  itemText: {
    textAlign: "center",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
  selectedBorder: {
    borderColor: "purple",
  },
});
