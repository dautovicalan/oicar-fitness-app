import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { validateWorkoutForm } from "../../utils/FormValidatonUtils";
import ExerciseMuscleBox from "../../components/workout/ExerciseMuscleBox";

const muscleGroups = ["chest", "back", "shoulders", "legs", "arms"];

export default function AddWorkoutView({ route, navigation }) {
  const { addWorkout, selectedDate } = route.params;

  return (
    <View style={style.container}>
      <FlatList
        contentContainerStyle={{ width: "90%", marginBottom: 20 }}
        data={muscleGroups}
        renderItem={(item) => (
          <ExerciseMuscleBox
            muscleName={item.item}
            navigation={() =>
              navigation.navigate("Add Specific Exercise", {
                muscleId: item.item,
                selectedDate,
              })
            }
          />
        )}
        keyExtractor={(item) => item}
      />
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
