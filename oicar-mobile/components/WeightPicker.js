import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TabSelector from "./TabSelector";
import { weightDataItems } from "../data/FitnessData";

export default function WeightPicker({
  selectedWeight,
  onWeightChange,
  width,
}) {
  const [isPound, setIsPound] = useState(false);

  const handleChange = () => {
    setIsPound((prevVal) => !prevVal);
  };

  return (
    <View style={{ width: width ? width : "50%" }}>
      <View>
        <TabSelector tabs={Array.of("KG", "LBS")} onChange={handleChange} />
      </View>
      <View>
        <Picker
          selectedValue={selectedWeight}
          onValueChange={(itemValue, itemIndex) => onWeightChange(itemValue)}
        >
          {weightDataItems(isPound)}
        </Picker>
      </View>
    </View>
  );
}
