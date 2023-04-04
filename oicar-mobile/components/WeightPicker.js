import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TabSelector from "./TabSelector";

export default function WeightPicker({ selectedWeight, onWeightChange }) {
  const [isPound, setIsPound] = useState(false);

  const handleChange = () => {
    setIsPound((prevVal) => !prevVal);
  };

  const renderPickerItems = () => {
    let items = [];
    if (!isPound) {
      for (let i = 0; i <= 200; i++) {
        items.push(<Picker.Item key={i} label={`${i} KG`} value={i} />);
      }
    } else {
      for (let i = 0; i <= 440; i++) {
        items.push(<Picker.Item key={i} label={`${i} LBS`} value={i} />);
      }
    }
    return items;
  };

  return (
    <View style={{ width: "50%" }}>
      <TabSelector tabs={Array.of("KG", "POUND")} onChange={handleChange} />
      <Picker
        selectedValue={selectedWeight}
        onValueChange={(itemValue, itemIndex) => onWeightChange(itemValue)}
      >
        {renderPickerItems()}
      </Picker>
    </View>
  );
}
