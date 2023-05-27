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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { validateExerciseForm } from "../../utils/FormValidatonUtils";
import { LineChart } from "react-native-chart-kit";
import { textInputStyles } from "../../styles/TextInputStyles";
import { useUserContext } from "../../context/UserContext";
import { format, set } from "date-fns";
import useFetch from "../../hooks/useFetch";

const testData = {
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
  const { user } = useUserContext();
  const { workoutId, exerciseId } = route.params;
  const [sets, setSets] = useState("0");
  const [repetition, setRepetition] = useState("0");
  const [weight, setWeight] = useState("0");

  const [errors, setErrors] = useState(null);

  const { data, isPending, error } = useFetch(
    `http://localhost:5280/api/Exercise/GetProgress?idUser=${user.id}&exerciseId=${exerciseId}`
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setSets(`${data[0].numberOfSets}`);
      setRepetition(`${data[0].numberOfReps}`);
      setWeight(`${data[0].weight}`);
    }
  }, [data]);

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

    try {
      const request = await fetch(
        `http://localhost:5280/api/Exercise/CreateProgress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            exerciseId: exerciseId,
            numberOfSets: sets,
            numberOfReps: repetition,
            weight: weight,
            date: format(new Date(), "yyyy-MM-dd"),
          }),
        }
      );

      if (request.status === 200) {
        Alert.alert("Success", "Data saved successfully");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setSets("");
      setRepetition("");
      setWeight("");
      setErrors(null);
    }
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
            data={testData}
            width={400}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
          <TextInput
            style={[style.textInput, textInputStyles.textInput]}
            label={"Set Sets"}
            value={sets}
            keyboardType="numeric"
            onChangeText={(text) => setSets(text.replace(/[^0-9]/g, ""))}
            error={errors?.sets}
          />
          <TextInput
            style={[style.textInput, textInputStyles.textInput]}
            label={"Set Repetition"}
            value={repetition}
            keyboardType="numeric"
            onChangeText={(text) => setRepetition(text.replace(/[^0-9]/g, ""))}
            error={errors?.repetition}
          />
          <TextInput
            style={[style.textInput, textInputStyles.textInput]}
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
