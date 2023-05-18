import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.container}
        keyboardVerticalOffset={160}
      >
        <View style={style.innerContainer}>
          <LineChart
            style={{ marginHorizontal: 20 }}
            data={data}
            width={400}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
          <TextInput
            style={style.textInput}
            label={"Set Sets"}
            value={sets}
            keyboardType="numeric"
            onChangeText={(text) => setSets(text.replace(/[^0-9]/g, ""))}
            error={errors?.sets}
          />
          <TextInput
            style={style.textInput}
            label={"Set Repetition"}
            value={repetition}
            keyboardType="numeric"
            onChangeText={(text) => setRepetition(text.replace(/[^0-9]/g, ""))}
            error={errors?.repetition}
          />
          <TextInput
            style={style.textInput}
            label={"Set Weight"}
            value={weight}
            keyboardType="numeric"
            onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ""))}
            error={errors?.weight}
          />
          <Button mode="contained" onPress={handleSubmit}>
            Save
          </Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    gap: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
  },
});
