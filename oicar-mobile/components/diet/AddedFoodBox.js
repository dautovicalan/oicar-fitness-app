import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React from "react";

export default function AddedFoodBox({
  food,
  calories,
  idMeal,
  idFood,
  deleteFood,
}) {
  return (
    <Pressable onLongPress={deleteFood} style={style.container}>
      <Text>{food}</Text>
      <Text>{calories}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
