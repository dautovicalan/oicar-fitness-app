import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

export default function GoalView({ navigation }) {
  return (
    <View style={style.container}>
      <Pressable onPress={() => navigation.navigate("Workouts")}>
        <Text variant="displayMedium" style={style.textBorder}>
          Be more active
        </Text>
      </Pressable>
      <Text variant="displayMedium">Lose weight</Text>
      <Text variant="displayMedium">Stay toned</Text>
      <Text variant="displayMedium">Build muscle</Text>
      <Text variant="displayMedium">Reduce stress</Text>
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
