import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import PersonalRecordBox from "../../components/workout/PersonalRecordBox";

export default function PersonalRecordView() {
  const handleClick = () => {};

  return (
    <View style={style.container}>
      <Text>Your PR's</Text>

      <PersonalRecordBox />

      <Button mode="contained" onPress={handleClick}>
        Add New PR
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
