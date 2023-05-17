import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { validateExerciseForm } from "../../utils/FormValidatonUtils";
import { LineChart } from "react-native-chart-kit";

const data = {
  labels: ["January", "February", "March"],
  datasets: [
    {
      data: [20, 35, 45],
    },
  ],
};

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

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
    if (!validateData.isValid) {
      return setErrors(validateData.errors);
    }
    // TODO - API call
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <LineChart
        data={data}
        width={400}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
      <TextInput
        label={"Set Sets"}
        value={sets}
        keyboardType="numeric"
        onChangeText={(text) => setSets(text.replace(/[^0-9]/g, ""))}
        error={errors?.sets}
      />
      <TextInput
        label={"Set Repetition"}
        value={repetition}
        keyboardType="numeric"
        onChangeText={(text) => setRepetition(text.replace(/[^0-9]/g, ""))}
        error={errors?.repetition}
      />
      <TextInput
        label={"Set Weight"}
        value={weight}
        keyboardType="numeric"
        onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ""))}
        error={errors?.weight}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Save
      </Button>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    margin: 10,
  },
});
