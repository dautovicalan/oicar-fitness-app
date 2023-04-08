import { View, Text } from "react-native";
import React, { useState } from "react";
import AnimatedAccordion from "../boxes/AnimatedAccordion";
import { Button, Switch } from "react-native-paper";
import HeightPicker from "../HeightPicker";
import WeightPicker from "../WeightPicker";

export default function EditProfile({ onSave }) {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [newsletter, setNewsletter] = useState();
  return (
    <>
      <AnimatedAccordion
        title={"Weight"}
        height={200}
        content={<WeightPicker />}
      />
      <AnimatedAccordion
        title={"Height"}
        height={200}
        content={<HeightPicker />}
      />
      <AnimatedAccordion
        title={"Newsletter"}
        height={100}
        content={<Switch />}
      />
      <Button mode="contained" onPress={onSave}>
        Save
      </Button>
    </>
  );
}
