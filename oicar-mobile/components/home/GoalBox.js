import { StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

export default function GoalBox() {
  return (
    <View style={style.container}>
      <Text>Follow Your Goal</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    backgroundColor: "#FF5668",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
