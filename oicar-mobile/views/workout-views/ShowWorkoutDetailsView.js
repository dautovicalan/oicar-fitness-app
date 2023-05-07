import {
  View,
  Text,
  StyleSheet,
  SafeAreaViewBase,
  SafeAreaView,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const exerciseNames = [
  "bench press",
  "squat",
  "deadlift",
  "overhead press",
  "barbell row",
];

const ExerciseItemBox = ({ exerciseName, navigation }) => {
  const handleDelete = () => {
    Alert.alert("Are you sure you want to delete this exercise?", "", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {},
      },
    ]);
  };

  return (
    <Pressable style={styles.exerciseItemContainer} onLongPress={handleDelete}>
      <Text>{exerciseName}</Text>
      <Text>3 sets</Text>
      <Text>12 reps</Text>
      <Text>50kg</Text>
      <Button mode="contained" onPress={navigation}>
        Details
      </Button>
    </Pressable>
  );
};

export default function ShowWorkoutDetailsView({ route, navigation }) {
  const { workoutId } = route.params;

  const deleteExercise = () => {
    Alert.alert("Are you sure you want to delete this workout?", "", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          // TODO: delete workout
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: "90%", marginBottom: 20 }}
        data={exerciseNames}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <ExerciseItemBox
            exerciseName={item.item}
            navigation={() =>
              navigation.navigate("Exercise Details", {
                workoutId,
                exerciseName: item.item,
              })
            }
          />
        )}
      />
      <Button
        mode="contained"
        onPress={deleteExercise}
        style={styles.buttonStyle}
      >
        Delete Workout
      </Button>
    </SafeAreaView>
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
    width: "45%",
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
