import { View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { IconButton } from "react-native-paper";

export default function ExerciseMuscleBox({
  muscleId,
  muscleName,
  navigation,
}) {
  return (
    <Pressable onPress={navigation}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/workout.webp")}
          style={{ width: 50, height: 50 }}
        />
        <Text variant="titleMedium">{muscleName}</Text>
        <IconButton icon={"arrow-right-thick"} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5,
    margin: 10,
  },
});
