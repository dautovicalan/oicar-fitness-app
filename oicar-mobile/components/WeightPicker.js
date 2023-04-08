import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TabSelector from "./TabSelector";
import { weightDataItems } from "../data/FitnessData";

export default function WeightPicker({ selectedWeight, onWeightChange }) {
  const [isPound, setIsPound] = useState(false);

  const handleChange = () => {
    setIsPound((prevVal) => !prevVal);
  };

  return (
    <View style={{ width: "50%" }}>
      <TabSelector tabs={Array.of("KG", "LBS")} onChange={handleChange} />
      <Picker
        selectedValue={selectedWeight}
        onValueChange={(itemValue, itemIndex) => onWeightChange(itemValue)}
      >
        {weightDataItems(isPound)}
      </Picker>
    </View>
  );
}
