import { View, StyleSheet, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import { useRegistrationProcess } from "../../context/RegistrationProcessContext";
import { fitnessGoals } from "../../data/FitnessData";

export default function GoalView({ navigation }) {
  const { setGoal } = useRegistrationProcess();
  const [selectedGoal, setSelectedGoal] = useState();

  const handleClick = () => {
    if (!selectedGoal) {
      return Alert.alert("Select one goal");
    }
    setGoal(selectedGoal);

    return navigation.navigate("Workouts");
  };

  return (
    <View style={style.container}>
      {fitnessGoals.map((goal) => {
        return (
          <Pressable
            key={goal.id}
            onPress={() => setSelectedGoal(goal.text)}
            style={style.innerItem}
          >
            <Text
              variant="displayMedium"
              style={Array.of(
                style.itemText,
                goal.text === selectedGoal ? style.selectedBorder : null
              )}
            >
              {goal.text}
            </Text>
          </Pressable>
        );
      })}
      <Button
        mode="contained"
        style={{ width: "80%" }}
        onPress={handleClick}
        icon="rocket-launch"
      >
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
  innerItem: {
    width: "90%",
  },
  itemText: {
    textAlign: "center",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
  selectedBorder: {
    borderColor: "purple",
  },
});
