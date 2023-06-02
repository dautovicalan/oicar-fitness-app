import React from "react";
import { Button } from "react-native-paper";

export default function CustomBackButton({ onPress }) {
  return <Button mode="contained" icon="arrow-left" onPress={onPress} />;
}
