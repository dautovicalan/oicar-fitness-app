import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import AnimatedAccordion from "../boxes/AnimatedAccordion";
import { Button, Switch } from "react-native-paper";
import HeightPicker from "../HeightPicker";
import WeightPicker from "../WeightPicker";
import { fitnessGoals } from "../../data/FitnessData";

export default function EditProfile({ onSave, userData }) {
  const [weight, setWeight] = useState(userData.weight);
  const [height, setHeight] = useState(userData.height);
  const [goal, setGoal] = useState(userData.goal);
  const [newsletter, setNewsletter] = useState(userData.newsletter);

  const handleWeightChange = (weight) => {
    setWeight(weight);
  };

  const handleHeightChange = (height) => {
    setHeight(height);
  };

  const handleGoalChange = (goal) => {
    setGoal(goal);
  };

  return (
    <>
      <AnimatedAccordion
        title={"Weight"}
        height={220}
        value={weight + " KG"}
        content={
          <WeightPicker
            selectedWeight={weight}
            onWeightChange={handleWeightChange}
            width={"100%"}
          />
        }
      />
      <AnimatedAccordion
        title={"Height"}
        height={220}
        value={height + " CM"}
        content={
          <HeightPicker
            selectedHeight={height}
            onHeightChange={handleHeightChange}
            width={"100%"}
          />
        }
      />
      <AnimatedAccordion
        title={"Goal"}
        height={200}
        content={
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 10,
            }}
          >
            {fitnessGoals.map((fitnessGoal) => (
              <Pressable
                key={goal.id}
                onPress={() => handleGoalChange(fitnessGoal.text)}
              >
                <Text
                  style={{
                    padding: 10,
                    borderColor: fitnessGoal.text === goal ? "orange" : "grey",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  {fitnessGoal.text}
                </Text>
              </Pressable>
            ))}
          </View>
        }
        value={goal}
      />
      <AnimatedAccordion
        title={"Newsletter"}
        height={70}
        value={newsletter ? "Subscribed" : "Unsubscribed"}
        content={
          <Switch
            value={newsletter}
            onChange={() => setNewsletter((prevVal) => !prevVal)}
          />
        }
      />
      <Button mode="contained" onPress={onSave}>
        Save
      </Button>
    </>
  );
}
