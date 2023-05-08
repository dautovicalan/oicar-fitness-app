import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SingleWorkoutBox from "../../components/workout/SingleWorkoutBox";
import { ActivityIndicator, TextInput } from "react-native-paper";
import useFetch from "../../hooks/useFetch";

export default function ShowTutorialView({ navigation }) {
  const { data, isPending, error } = useFetch(
    "http://localhost:5280/api/Exercise"
  );

  const [workouts, setWorkouts] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const handleFilter = (text) => {
    setSearchTerm(text);
    if (text === "") {
      return setWorkouts(data);
    }
    const filtered = workouts.filter((workout) => {
      return workout.name.includes(searchTerm);
    });
    setWorkouts(filtered);
  };

  useEffect(() => {
    if (data) {
      setWorkouts(data);
    }
  }, [data]);

  return (
    <View style={style.container}>
      <TextInput
        label={"Search for workout"}
        style={{ width: "90%", marginTop: 10 }}
        value={searchTerm}
        onChangeText={handleFilter}
      />
      {!isPending ? (
        <FlatList
          data={workouts}
          contentContainerStyle={style.listContainer}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SingleWorkoutBox
              workoutId={item.id}
              workoutName={item.name}
              navigation={() =>
                navigation.navigate("Single Tutorial", {
                  workoutId: item.id,
                })
              }
              renderFullWidth={
                workouts.length % 2 !== 0 &&
                item.key === workouts[workouts.length - 1].key
              }
            />
          )}
        />
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  listContainer: {
    alignItems: "center",
  },
});
