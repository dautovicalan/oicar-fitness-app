import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { textInputStyles } from "../../styles/TextInputStyles";

export default function AddWorkoutNameView({ navigation, route }) {
  const { workoutId, selectedDate } = route.params;
  const [workoutName, setWorkoutName] = useState("");

  const handleNext = () => {
    if (workoutName === "") {
      return Alert.alert("Please enter a workout name");
    }

    navigation.navigate("Add Workout", {
      workoutId,
      selectedDate,
      workoutName,
    });
  };

  return (
    <View style={style.container}>
      <TextInput
        label={"Set Workout Name"}
        value={workoutName}
        onChangeText={(text) => setWorkoutName(text)}
        style={[textInputStyles.textInput, { width: "90%" }]}
      />
      <Button mode="contained" onPress={handleNext}>
        Next
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
