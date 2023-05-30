import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { validateExerciseForm } from "../../utils/FormValidatonUtils";
import { LineChart } from "react-native-chart-kit";
import { textInputStyles } from "../../styles/TextInputStyles";
import { useUserContext } from "../../context/UserContext";
import { format, parseISO } from "date-fns";
import useFetch from "../../hooks/useFetch";

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#000000",
  backgroundGradientTo: "#000000",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export default function ShowExerciseDetailsView({ route }) {
  const { user } = useUserContext();
  const { exerciseId } = route.params;

  const [chartData, setChartData] = useState(null);
  const [sets, setSets] = useState("");
  const [repetition, setRepetition] = useState("");
  const [weight, setWeight] = useState("");

  const [errors, setErrors] = useState(null);

  const { data, isPending } = useFetch(
    `http://localhost:5280/api/Exercise/GetProgress?idUser=${user.id}&exerciseId=${exerciseId}`
  );

  useEffect(() => {
    if (data && data.length > 0) {
      const lastFourInArray = data.slice(Math.max(data.length - 4, 0));
      const labels = lastFourInArray.map((item) =>
        format(parseISO(item.date), "dd/MM/yyyy")
      );
      const datasets = [
        {
          data: lastFourInArray.map((item) => item.weight),
        },
      ];
      setChartData({ labels, datasets });
    }
  }, [data]);

  console.log(data);

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
        setChartData((prevVal) => {
          // TODO if there is no data in chartData
          if (!prevVal?.labels) {
            return {
              labels: [format(new Date(), "dd/MM/yyyy")],
              datasets: [
                {
                  data: [weight],
                },
              ],
            };
          }
          const newData = {
            labels: [...prevVal.labels, format(new Date(), "dd/MM/yyyy")],
            datasets: [
              {
                data: [...prevVal.datasets[0].data, weight],
              },
            ],
          };
          return newData;
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setErrors(null);
      setSets("");
      setRepetition("");
      setWeight("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.container}
        keyboardVerticalOffset={160}
      >
        {isPending ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View style={style.innerContainer}>
            {chartData ? (
              <LineChart
                style={{ marginHorizontal: 20 }}
                data={chartData}
                width={400}
                height={220}
                chartConfig={chartConfig}
                bezier
              />
            ) : (
              <Text
                variant="titleMedium"
                style={{
                  width: 400,
                  height: 220,
                  textAlign: "center",
                }}
              >
                No data to show
              </Text>
            )}
            <View style={style.innerContainer}>
              <Text variant="titleMedium">Add Progress To Chart</Text>
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
                onChangeText={(text) =>
                  setRepetition(text.replace(/[^0-9]/g, ""))
                }
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
                Add Progress
              </Button>
            </View>
          </View>
        )}
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
