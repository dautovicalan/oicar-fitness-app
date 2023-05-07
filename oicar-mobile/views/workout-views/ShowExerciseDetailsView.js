import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { validateExerciseForm } from "../../utils/FormValidatonUtils";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function ShowExerciseDetailsView({ route }) {
  const { workoutId } = route.params;
  const [sets, setSets] = useState("");
  const [repetition, setRepetition] = useState("");
  const [weight, setWeight] = useState("");

  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    setErrors(null);
    const validateData = await validateExerciseForm({
      sets,
      repetition,
      weight,
    });
    console.log(validateData);
    if (!validateData.isValid) {
      return setErrors(validateData.errors);
    }
    // TODO - API call
  };

  return (
    <SafeAreaView style={style.container}>
      <Text>Graph Stuff</Text>
      <TextInput
        label={"Set Sets"}
        value={sets}
        keyboardType="numeric"
        onChangeText={(text) => setSets(text)}
        error={errors?.sets}
      />
      <TextInput
        label={"Set Repetition"}
        value={repetition}
        keyboardType="numeric"
        onChangeText={(text) => setRepetition(text)}
        error={errors?.repetition}
      />
      <TextInput
        label={"Set Weight"}
        value={weight}
        keyboardType="numeric"
        onChangeText={(text) => setWeight(text)}
        error={errors?.weight}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Save
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    margin: 10,
  },
});
