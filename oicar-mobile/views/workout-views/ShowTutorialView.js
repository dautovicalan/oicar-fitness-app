import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SingleWorkoutBox from "../../components/workout/SingleWorkoutBox";
import { ActivityIndicator, TextInput } from "react-native-paper";
import useFetch from "../../hooks/useFetch";
import { textInputStyles } from "../../styles/TextInputStyles";

export default function ShowTutorialView({ navigation }) {
  const { data, isPending, error } = useFetch(
    "http://localhost:5280/api/Exercise"
  );

  const [workouts, setWorkouts] = useState(data);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data) {
      setWorkouts(data);
    }
  }, [data]);

  const handleFilter = (text) => {
    setSearchTerm(text);
    if (text.length === 0) {
      return setFilteredWorkouts([]);
    }
    const filterData = workouts.filter((workout) => {
      return workout.name.toUpperCase().includes(text.toUpperCase());
    });
    setFilteredWorkouts(filterData);
  };

  return (
    <View style={style.container}>
      <TextInput
        label={"Search for workout"}
        style={[{ width: "90%", marginTop: 10 }, textInputStyles.textInput]}
        value={searchTerm}
        onChangeText={handleFilter}
      />
      {!isPending ? (
        <FlatList
          style={{ width: "100%" }}
          data={filteredWorkouts.length > 0 ? filteredWorkouts : workouts}
          contentContainerStyle={style.listContainer}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <SingleWorkoutBox
              workoutId={item.item.id}
              workoutName={item.item.name}
              workoutGif={item.item.gifUrl}
              navigation={() =>
                navigation.navigate("Single Tutorial", {
                  workoutName: item.item.name,
                  workoutGif: item.item.gifUrl,
                })
              }
              renderFullWidth={
                filteredWorkouts.length % 2 !== 0 &&
                item.index === filteredWorkouts.length - 1
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
