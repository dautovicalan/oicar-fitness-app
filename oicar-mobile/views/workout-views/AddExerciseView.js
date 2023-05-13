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
import { Button, Checkbox, ActivityIndicator } from "react-native-paper";
import useFetch from "../../hooks/useFetch";
import { useUserContext } from "../../context/UserContext";

const exerciseNames = [
  "bench press",
  "squat",
  "deadlift",
  "overhead press",
  "barbell row",
];

const ExerciseItemBox = ({
  addExercise,
  removeExercise,
  exerciseId,
  exerciseName,
  exerciseGif,
}) => {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    if (checked) {
      removeExercise(exerciseId);
    } else {
      addExercise(exerciseId);
    }
    setChecked((prevVal) => !prevVal);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.exerciseItemContainer}>
        <Image
          source={{ uri: exerciseGif }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{exerciseName}</Text>
        <Checkbox status={checked ? "checked" : "unchecked"} />
      </View>
    </Pressable>
  );
};

export default function AddExerciseView({ route, navigation }) {
  const { muscleId, selectedDate } = route.params;

  const { user } = useUserContext();

  const { data, isPending, error } = useFetch(
    "http://localhost:5280/api/Exercise/GetByBodyPart?bodyPartId=" + muscleId,
    "GET"
  );

  const [selectedExercises, setSelectedExercises] = useState([]);

  const addExercise = (exercise) => {
    setSelectedExercises((prevVal) => [...prevVal, exercise]);
  };

  const removeExercise = (exercise) => {
    setSelectedExercises((prevVal) =>
      prevVal.filter((item) => item.id !== exercise.id)
    );
  };

  const handleSubmit = async () => {
    const requestCreateWorkout = await fetch(
      "http://localhost:5280/api/CustomWorkout/Create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          name: user.name + "_" + new Date().toDateString(),
        }),
      }
    );

    if (requestCreateWorkout.status !== 200) {
      return Alert.alert("Error creating workout");
    }

    const responseCreateWorkout = await requestCreateWorkout.json();

    const requestAddExercises = await fetch(
      "http://localhost:5280/api/CustomWorkout/AddExercises?idWorkout=" +
        responseCreateWorkout.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedExercises.map((item) => item.id)),
      }
    );

    if (requestAddExercises.status !== 200) {
      return Alert.alert("Error adding exercises");
    }

    Alert.alert("You created workout", "", [
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
      {isPending ? (
        <ActivityIndicator animating={true} />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ width: "90%", marginBottom: 20 }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <ExerciseItemBox
                addExercise={addExercise}
                removeExercise={removeExercise}
                exerciseId={item.item.id}
                exerciseName={item.item.name}
                exerciseGif={item.item.gifUrl}
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
        </>
      )}
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
    flexDirection: "column",
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
