import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export default function WorkoutType({ navigation }) {
  const [workoutType, setWorkoutType] = useState(1);
  const handleClick = () => {
    if (!workoutType) {
      return Alert.alert("Select Type");
    }
    navigation.navigate("Workout Sets", { workoutType });
  };

  return (
    <SafeAreaView style={style.container}>
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
      <Button mode="contained" onPress={handleClick}>
        Next
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
