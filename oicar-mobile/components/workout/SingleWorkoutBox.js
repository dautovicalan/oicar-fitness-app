import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";

export default function SingleWorkoutBox({
  navigation,
  workoutName,
  workoutGif,
  renderFullWidth,
}) {
  console.log(workoutName + " " + renderFullWidth);
  return (
    <View
      style={[
        style.container,
        { width: renderFullWidth === true ? "95%" : "45%" },
      ]}
    >
      <Text variant="bodyLarge">{workoutName}</Text>
      <Image source={{ uri: workoutGif }} style={{ width: 60, height: 60 }} />
      <Button mode="contained" onPress={navigation}>
        Show
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    margin: 8,
  },
});
