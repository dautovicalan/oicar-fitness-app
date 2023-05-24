import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native-paper";
import TabSelector from "./TabSelector";
import { heightDataItems } from "../data/FitnessData";

export default function HeightPicker({
  selectedHeight,
  onHeightChange,
  width,
}) {
  const [isFeet, setIsFeet] = useState(false);

  const handleChange = () => {
    setIsFeet((prevVal) => !prevVal);
  };

  return (
    <View style={{ width: width ? width : "50%" }}>
      <TabSelector tabs={Array.of("CM", "FT")} onChange={handleChange} />
      <Picker
        selectedValue={selectedHeight}
        onValueChange={(itemValue, itemIndex) => onHeightChange(itemValue)}
      >
        {heightDataItems(isFeet)}
      </Picker>
    </View>
  );
}
