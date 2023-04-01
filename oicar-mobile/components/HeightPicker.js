import { View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function HeightPicker() {
  const [selectedHeight, setSelectedHeight] = useState();
  return (
    <Picker selectedValue={selectedHeight} style={{ width: "50%" }}>
      <Picker.Item label="190 cm" value={190} />
      <Picker.Item label="191 cm" value={200} />
      <Picker.Item label="192 cm" value={210} />
    </Picker>
  );
}
