import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function SingleWorkoutBox({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Single Workout Box</Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/googlesvg.png")}
      />
      <Button mode="contained" onPress={navigation}>
        Show
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "45%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    marginRight: 10,
  },
});
