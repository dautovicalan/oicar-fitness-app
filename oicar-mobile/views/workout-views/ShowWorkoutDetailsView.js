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
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import useFetch from "../../hooks/useFetch";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const ExerciseItemBox = ({ exerciseName, navigation, renderFullWidth }) => {
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
    <Pressable
      style={[
        styles.exerciseItemContainer,
        { width: renderFullWidth === true ? "95%" : "45%" },
      ]}
      onLongPress={handleDelete}
    >
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
  const { workoutId, selectedDate } = route.params;
  const { user } = useUserContext();

  const { data, isPending, error } = useFetch(
    `http://localhost:5280/api/CustomWorkout/GetWorkout?idUser=${user.id}&idWorkout=${workoutId}`,
    "GET"
  );

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (data) {
      setExercises(data?.exercises);
    }
  }, [data]);

  const deleteExercise = () => {
    Alert.alert("Are you sure you want to delete this workout?", "", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const request = await fetch(
              `http://localhost:5280/api/CustomWorkout/Delete?idUser=${user.id}&idWorkout=${workoutId}`,
              {
                method: "DELETE",
              }
            );
            if (request.status === 200) {
              Alert.alert("Success", "Workout deleted successfully");
              navigation.reset({
                index: 0,
                routes: [{ name: "Workouts" }],
              });
            } else {
              throw new Error("Something went wrong");
            }
          } catch (error) {
            Alert.alert("Error", "Something went wrong");
          }
        },
      },
    ]);
  };

  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      {isPending && <ActivityIndicator animating={true} />}
      {exercises && exercises.length === 0 && !isPending ? (
        <Text>You have no exercises for this workout</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ width: "90%", marginBottom: 20 }}
          data={exercises}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <ExerciseItemBox
              exerciseName={item.item.name}
              navigation={() =>
                navigation.navigate("Exercise Details", {
                  workoutId,
                  exerciseName: item.item.name,
                })
              }
              renderFullWidth={
                exercises.length % 2 !== 0 &&
                item.key === exercises[exercises.length - 1].key
              }
            />
          )}
        />
      )}

      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={() =>
            navigation.navigate("Add Workout", {
              selectedDate,
            })
          }
        >
          Add Exercise
        </Button>
        <Button
          mode="contained"
          onPress={deleteExercise}
          style={styles.buttonStyle}
        >
          Delete Workout
        </Button>
      </View>
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
