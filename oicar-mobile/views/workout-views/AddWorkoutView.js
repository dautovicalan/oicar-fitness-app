import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, TextInput } from "react-native-paper";
import { validateWorkoutForm } from "../../utils/FormValidatonUtils";

export default function AddWorkoutView({ route, navigation }) {
  const { addWorkout } = route.params;

  const [workoutType, setWorkoutType] = useState(3);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [errors, setErrors] = useState(null);

  const handleClick = async () => {
    const validateResult = await validateWorkoutForm({
      workoutName: workoutType,
      workoutSets: sets,
      workoutReps: reps,
      workoutWeight: weight,
    });

    if (!validateResult.isValid) {
      return setErrors(validateResult.errors);
    }

    addWorkout({
      workoutName: workoutType,
      workoutSets: sets,
      workoutReps: reps,
      workoutWeight: weight,
    });
    return navigation.goBack();
  };

  return (
    <View style={style.container}>
      <View style={style.row}>
        <Text>Workout Type</Text>
        <Picker
          selectedValue={workoutType}
          onValueChange={(itemValue, itemIndex) => setWorkoutType(itemValue)}
          style={{ width: 200, height: 200 }}
        >
          <Picker.Item key={1} label="Chest" value={1} />
          <Picker.Item key={2} label="Back" value={2} />
          <Picker.Item key={3} label="Legs" value={3} />
          <Picker.Item key={4} label="Shoulders" value={4} />
          <Picker.Item key={5} label="Abs" value={5} />
        </Picker>
      </View>
      <View style={style.row}>
        <TextInput
          style={{ width: "90%" }}
          label={"Workout Sets"}
          value={sets}
          error={errors?.workoutSets}
          onChangeText={(text) => setSets(text)}
        />
      </View>
      <View style={style.row}>
        <TextInput
          style={{ width: "90%" }}
          label={"Workout Reps"}
          value={reps}
          error={errors?.workoutReps}
          onChangeText={(text) => setReps(text)}
        />
      </View>
      <View style={style.row}>
        <TextInput
          style={{ width: "90%" }}
          label={"Weight"}
          value={weight}
          error={errors?.workoutWeight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>
      <Button mode="contained" onPress={handleClick}>
        Add Workout
      </Button>
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
