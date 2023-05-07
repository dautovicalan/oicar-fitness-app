import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import React, { useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { Button } from "react-native-paper";
import SingleUserEnteredWorkoutBox from "../../components/workout/SingleUserEnteredWorkoutBox";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function WorkoutView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateWorkouts, setSelectedDateWorkouts] = useState([
    {
      id: 1,
      workoutName: "Leg Day",
    },
    {
      id: 2,
      workoutName: "Pull Day",
    },
    {
      id: 3,
      workoutName: "Pull Day",
    },
    {
      id: 4,
      workoutName: "Pull Day",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleDateChange = async (date) => {
    // fetch API
    setLoading(true);

    setSelectedDate(date);
    // setSelectedDateWorkouts([]);

    setLoading(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <DateSlider
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
      <View style={style.column}>
        <Text
          variant="titleMedium"
          style={{ textAlign: "center", marginVertical: 10 }}
        >
          Summary for: {selectedDate.toDateString()}
        </Text>
        <Button
          mode="contained"
          icon="plus"
          backgroundColor="#6750A4"
          onPress={() =>
            navigation.navigate("Add Workout", {
              selectedDate: selectedDate.toDateString(),
            })
          }
        >
          Add Workout
        </Button>
      </View>
      <FlatList
        contentContainerStyle={style.workouts}
        data={selectedDateWorkouts}
        numColumns={2}
        renderItem={(item) => (
          <SingleUserEnteredWorkoutBox
            {...item.item}
            navigation={() =>
              navigation.navigate("Show Single Workout Details", {
                workoutId: item.item.id,
                workoutName: item.item.workoutName,
              })
            }
            removeWorkout={() => {
              setSelectedDateWorkouts(
                selectedDateWorkouts.filter((w) => w.id !== item.item.id)
              );
            }}
            renderFullWidth={
              selectedDateWorkouts.length % 2 !== 0 &&
              item.index === selectedDateWorkouts.length - 1
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: { flex: 1 },
  workouts: {
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
  },
});
