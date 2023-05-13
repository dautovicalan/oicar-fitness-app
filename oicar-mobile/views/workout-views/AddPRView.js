import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validateAddPRForm } from "../../utils/FormValidatonUtils";
import { readFromStorage, writeToStorage } from "../../utils/StorageUtils";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export default function AddPRView({ navigation }) {
  const { user } = useUserContext();

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

    try {
      const personalRecords = await readFromStorage(
        user.id + "_" + "personalRecords"
      );

      if (personalRecords !== null && personalRecords !== undefined) {
        const newPersonalRecords = [
          ...personalRecords,
          {
            id: uuidv4(),
            workoutDate: format(workoutDate, "dd/MM/yyyy"),
            workoutName,
            workoutWeight,
          },
        ];

        await writeToStorage(
          user.id + "_" + "personalRecords",
          newPersonalRecords
        );
      } else {
        await writeToStorage(user.id + "_" + "personalRecords", [
          {
            workoutDate,
            workoutName,
            workoutWeight,
          },
        ]);
      }

      Alert.alert("Success", "Personal record added successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
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
