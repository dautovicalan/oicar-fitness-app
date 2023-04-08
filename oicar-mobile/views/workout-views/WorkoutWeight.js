import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";

export default function WorkoutWeight() {
  const handleClick = () => {};

  return (
    <View style={style.container}>
      <Text>Workout Weight</Text>
      <TextInput label={"Weight lifted"} />
      <Button mode="contained" onPress={handleClick}>
        Finish
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
