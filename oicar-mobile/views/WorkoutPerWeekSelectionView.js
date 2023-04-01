import { View, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Text } from "react-native-paper";

export default function WorkoutPerWeekSelectionView() {
  const handleClick = () => {};

  return (
    <View style={style.container}>
      <Pressable onPress={() => console.log("Mario je gay")}>
        <Text variant="displayMedium" style={style.textBorder}>
          2 - 3
        </Text>
      </Pressable>
      <Text variant="displayMedium" style={style.textBorder}>
        3 - 4
      </Text>
      <Text variant="displayMedium" style={style.textBorder}>
        4 - 5
      </Text>
      <Text variant="displayMedium" style={style.textBorder}>
        5+
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textBorder: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
  },
});
