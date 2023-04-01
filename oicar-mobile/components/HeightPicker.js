import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native-paper";
import TabSelector from "./TabSelector";

export default function HeightPicker({ selectedHeight, onHeightChange }) {
  const [isFeet, setIsFeet] = useState(false);

  const renderPickerItems = () => {
    let items = [];
    if (!isFeet) {
      for (let i = 100; i <= 220; i++) {
        items.push(<Picker.Item key={i} label={`${i} cm`} value={i} />);
      }
    } else {
      for (let i = 4; i <= 7; i++) {
        for (let j = 0; j <= 11; j++) {
          items.push(
            <Picker.Item
              key={`${i}-${j}`}
              label={`${i}'${j}"`}
              value={i * 12 + j}
            />
          );
        }
      }
    }
    return items;
  };

  const handleChange = () => {
    setIsFeet((prevVal) => !prevVal);
  };

  console.log(isFeet);

  return (
    <View style={{ width: "50%" }}>
      <TabSelector tabs={Array.of("CM", "FEET")} onChange={handleChange} />
      <Picker
        selectedValue={selectedHeight}
        onValueChange={(itemValue, itemIndex) => onHeightChange(itemValue)}
      >
        {renderPickerItems()}
      </Picker>
    </View>
  );
}
