import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { Button } from "react-native-paper";
import SingleUserEnteredWorkoutBox from "../../components/workout/SingleUserEnteredWorkoutBox";
import { Text } from "react-native-paper";

export default function WorkoutView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateWorkouts, setSelectedDateWorkouts] = useState([
    {
      workoutName: "Bench Press",
      workoutSets: 3,
      workoutReps: 12,
      workoutWeight: 50,
    },
    {
      workoutName: "Triceps",
      workoutSets: 3,
      workoutReps: 12,
      workoutWeight: 50,
    },
    {
      workoutName: "Skull Crusher",
      workoutSets: 3,
      workoutReps: 12,
      workoutWeight: 50,
    },
  ]);

  const handleDateChange = async (date) => {
    // fetch API

    setSelectedDate(date);
    // setSelectedDateWorkouts([]);
  };

  return (
    <SafeAreaView style={style.container}>
      <DateSlider
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
      <Text
        variant="labelLarge"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Summary for: {selectedDate.toDateString()}
      </Text>
      <ScrollView contentContainerStyle={style.workouts}>
        {selectedDate &&
          selectedDateWorkouts.map((workout) => {
            return (
              <SingleUserEnteredWorkoutBox
                key={workout.workoutName}
                {...workout}
                removeWorkout={() => {
                  setSelectedDateWorkouts(
                    selectedDateWorkouts.filter(
                      (w) => w.workoutName !== workout.workoutName
                    )
                  );
                }}
              />
            );
          })}
      </ScrollView>
      <Button
        style={style.buttons}
        mode="contained"
        onPress={() =>
          navigation.navigate("Add Workout", {
            addWorkout: (workout) =>
              setSelectedDateWorkouts([...selectedDateWorkouts, workout]),
          })
        }
      >
        Enter Workout
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  workouts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  buttons: {},
});
