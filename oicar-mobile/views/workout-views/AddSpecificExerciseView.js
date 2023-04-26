import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Button, Checkbox } from "react-native-paper";

const exerciseNames = [
  "bench press",
  "squat",
  "deadlift",
  "overhead press",
  "barbell row",
];

const ExerciseItem = ({ addExercise, removeExercise }) => {
  const [checked, setChecked] = useState(false);

  // TODO - add exercise to selectedExercises, remove if already in there

  return (
    <Pressable onPress={() => setChecked((prevVal) => !prevVal)}>
      <View style={styles.exerciseItemContainer}>
        <Image
          source={require("../../assets/bench.gif")}
          style={{ width: 50, height: 50 }}
        />
        <Text>Bench Press</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked((prevVal) => !prevVal)}
        />
      </View>
    </Pressable>
  );
};

export default function AddSpecificExerciseView() {
  const [selectedExercises, setSelectedExercises] = useState([]);

  const addExercise = (exercise) => {
    setSelectedExercises((prevVal) => [...prevVal, exercise]);
  };

  const removeExercise = (exercise) => {
    setSelectedExercises((prevVal) =>
      prevVal.filter((item) => item !== exercise)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: "90%", marginBottom: 20 }}
        data={exerciseNames}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <ExerciseItem
            addExercise={addExercise}
            removeExercise={removeExercise}
          />
        )}
      />
      <Button mode="contained">Add Exercises</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseItemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    margin: 10,
  },
});
