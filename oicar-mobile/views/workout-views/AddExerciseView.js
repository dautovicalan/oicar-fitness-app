import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import useFetch from "../../hooks/useFetch";
import { useUserContext } from "../../context/UserContext";
import { textInputStyles } from "../../styles/TextInputStyles";

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
  const { muscleId, selectedDate, muscleName, workoutId, workoutName } =
    route.params;
  const { user } = useUserContext();

  const { data, isPending, error } = useFetch(
    "http://localhost:5280/api/Exercise/GetByBodyPart?bodyPartId=" + muscleId,
    "GET"
  );

  const [searchterm, setSearchterm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const addExercise = (exerciseId) => {
    setSelectedExercises((prevVal) => [...prevVal, exerciseId]);
  };

  const removeExercise = (exerciseId) => {
    setSelectedExercises((prevVal) =>
      prevVal.filter((item) => item !== exerciseId)
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let workoutIdHolder = workoutId;
      if (workoutIdHolder === null) {
        const requestCreateWorkout = await fetch(
          "http://localhost:5280/api/CustomWorkout/Create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              name: workoutName,
              date: selectedDate,
            }),
          }
        );
        const responseCreateWorkout = await requestCreateWorkout.json();
        workoutIdHolder = responseCreateWorkout;
      }

      const requestAddExercises = await fetch(
        `http://localhost:5280/api/CustomWorkout/AddExercises?idWorkout=${workoutIdHolder}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedExercises.map((item) => parseInt(item))),
        }
      );
      if (requestAddExercises.status === 500) {
        return Alert.alert("Exercise already added");
      }
      if (requestAddExercises.status !== 200) {
        return Alert.alert("Error adding exercises");
      }

      Alert.alert("You added Exercise", "", [
        {
          text: "Go Back",
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Workout Dashboard" }],
            }),
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = (searchterm) => {
    setSearchterm(searchterm);
    if (searchterm.length === 0) {
      setFilteredData([]);
      return;
    }

    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchterm.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {isPending ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View style={{ width: "90%", alignItems: "center" }}>
            <TextInput
              label={"Search exercises"}
              value={searchterm}
              style={[textInputStyles.textInput, { width: "90%" }]}
              onChangeText={filterData}
            />
            <FlatList
              style={{ width: "100%", height: "80%" }}
              contentContainerStyle={{ width: "100%", marginBottom: 20 }}
              data={filteredData.length === 0 ? data : filteredData}
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
          </View>
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={selectedExercises.length === 0 || loading}
        >
          Add Exercises
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  exerciseItemContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
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
