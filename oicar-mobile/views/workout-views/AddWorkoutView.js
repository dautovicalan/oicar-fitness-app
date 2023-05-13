import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { validateWorkoutForm } from "../../utils/FormValidatonUtils";
import ExerciseMuscleBox from "../../components/workout/ExerciseMuscleBox";
import useFetch from "../../hooks/useFetch";

const muscleGroups = ["chest", "back", "shoulders", "legs", "arms"];

export default function AddWorkoutView({ route, navigation }) {
  const { addWorkout, selectedDate } = route.params;

  const { data, isPending, error } = useFetch(
    "http://localhost:5280/api/Exercise/GetBodyParts",
    "GET"
  );

  return (
    <View style={style.container}>
      {isPending ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          contentContainerStyle={{ width: "90%", marginBottom: 20 }}
          data={data}
          renderItem={(item) => (
            <ExerciseMuscleBox
              muscleName={item.item.name}
              navigation={() =>
                navigation.navigate("Add Specific Exercise", {
                  muscleId: item.item.id,
                  selectedDate,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
