import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validateAddPRForm } from "../../utils/FormValidatonUtils";

export default function AddPRView() {
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [workoutName, setWorkoutName] = useState("");
  const [workoutWeight, setWorkoutWeight] = useState("");

  const [errors, setErrors] = useState(null);

  const handleClick = async () => {
    const validateData = await validateAddPRForm({
      workoutDate,
      workoutName,
      workoutWeight,
    });

    if (!validateData.isValid) {
      return setErrors(validateData.errors);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.dateSelect}>
        <Text>Select Date</Text>
        <DateTimePicker
          value={workoutDate}
          onChange={(date, selectedDate) => setWorkoutDate(selectedDate)}
        />
      </View>
      <TextInput
        label={"Enter Workout Name"}
        value={workoutName}
        error={errors?.workoutName}
        onChangeText={(text) => setWorkoutName(text)}
      />
      <TextInput
        label={"Enter Weight"}
        value={workoutWeight}
        error={errors?.workoutWeight}
        onChangeText={(text) => setWorkoutWeight(text)}
      />
      <Button mode="contained" onPress={handleClick}>
        Add PR
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
  dateSelect: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
