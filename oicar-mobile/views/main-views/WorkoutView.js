import { StyleSheet, SafeAreaView, FlatList, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { ActivityIndicator, Button } from "react-native-paper";
import SingleUserEnteredWorkoutBox from "../../components/workout/SingleUserEnteredWorkoutBox";
import { Text } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";

export default function WorkoutView({ navigation }) {
  const { user } = useUserContext();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateWorkouts, setSelectedDateWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(selectedDateWorkouts);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        setLoading(true);
        setSelectedDateWorkouts([]);
        const request = await fetch(
          `http://localhost:5280/api/CustomWorkout/ByDate?idUser=${
            user.id
          }&date=${format(selectedDate, "yyyy-MM-dd")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        if (request.status !== 200) {
          setSelectedDateWorkouts([]);
          setLoading(false);
          return;
        }
        const data = await request.json();
        setSelectedDateWorkouts([data]);
      } catch (error) {
        console.error(error);
        Alert.alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getWorkouts();
  }, [selectedDate]);

  return (
    <SafeAreaView style={style.container}>
      <DateSlider
        selectedDate={selectedDate}
        setSelectedDate={(date) => setSelectedDate(date)}
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
            navigation.navigate("Add Workout Name", {
              selectedDate: format(selectedDate, "yyyy-MM-dd"),
              workoutId: null,
            })
          }
        >
          Add Workout
        </Button>
      </View>
      {loading && (
        <ActivityIndicator animating={true} color="#6750A4" size="large" />
      )}
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
                workoutName: item.item.name,
                selectedDate: format(selectedDate, "dd-MM-yyyy"),
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
