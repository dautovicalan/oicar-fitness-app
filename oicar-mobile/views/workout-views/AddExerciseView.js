import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
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

const ExerciseItemBox = ({ addExercise, removeExercise, muscleName }) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    if (checked) {
      removeExercise(muscleName);
    } else {
      addExercise(muscleName);
    }
    setChecked((prevVal) => !prevVal);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.exerciseItemContainer}>
        <Image
          source={require("../../assets/bench.gif")}
          style={{ width: 50, height: 50 }}
        />
        <Text>{muscleName}</Text>
        <Checkbox status={checked ? "checked" : "unchecked"} />
      </View>
    </Pressable>
  );
};

export default function AddExerciseView({ route, navigation }) {
  const { muscleId, selectedDate } = route.params;
  const [selectedExercises, setSelectedExercises] = useState([]);

  const addExercise = (exercise) => {
    setSelectedExercises((prevVal) => [...prevVal, exercise]);
  };

  const removeExercise = (exercise) => {
    setSelectedExercises((prevVal) =>
      prevVal.filter((item) => item !== exercise)
    );
  };

  const handleSubmit = async () => {
    // TODO - add exercises to workout
    console.log(muscleId, selectedExercises, selectedDate);
    Alert.alert("You added: " + selectedExercises.join(", "), "", [
      {
        text: "Go Back",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Workout Dashboard" }],
          }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: "90%", marginBottom: 20 }}
        data={exerciseNames}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <ExerciseItemBox
            addExercise={addExercise}
            removeExercise={removeExercise}
            muscleName={item.item}
          />
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.buttonStyle}
      >
        Add Exercises
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    marginVertical: 10,
  },
  exerciseItemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    width: "95%",
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
