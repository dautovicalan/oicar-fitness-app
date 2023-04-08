import { View, Text } from "react-native";
import React, { useState } from "react";
import AnimatedAccordion from "../boxes/AnimatedAccordion";
import { Button, Switch } from "react-native-paper";
import HeightPicker from "../HeightPicker";
import WeightPicker from "../WeightPicker";

export default function EditProfile({ onSave }) {
  const [weight, setWeight] = useState(30);
  const [height, setHeight] = useState(100);
  const [newsletter, setNewsletter] = useState(true);

  const handleWeightChange = (weight) => {
    setWeight(weight);
  };

  const handleHeightChange = (height) => {
    setHeight(height);
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
        height={100}
        content={
          <>
            <Text>Change your goal</Text>
          </>
        }
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
