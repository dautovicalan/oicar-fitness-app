import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

export default function WeightPicker() {
  return (
    <Picker style={{ width: "50%" }}>
      <Picker.Item label="80kg" value={80} />
    </Picker>
  );
}
