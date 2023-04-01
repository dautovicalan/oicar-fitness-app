import { View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import { useRegistrationProcess } from "../context/RegistrationProcessContext";
import { fitnessGoals } from "../data/FitnessData";

export default function GoalView({ navigation }) {
  const { currentNewUser, setGoal } = useRegistrationProcess();
  const [selectedGoal, setSelectedGoal] = useState();

  const handleClick = () => {
    if (!selectedGoal) {
      return;
    }
    setGoal(selectedGoal);

    return navigation.navigate("Workouts");
  };

  return (
    <View style={style.container}>
      {fitnessGoals.map((goal) => {
        return (
          <Pressable key={goal.id} onPress={() => setSelectedGoal(goal.id)}>
            <Text
              variant="displayMedium"
              style={Array.of(
                style.textBorder,
                goal.id === selectedGoal ? style.selectedBorder : null
              )}
            >
              {goal.text}
            </Text>
          </Pressable>
        );
      })}
      <Button mode="contained" style={{ width: "80%" }} onPress={handleClick}>
        Next
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textBorder: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
  selectedBorder: {
    borderColor: "red",
  },
});
