import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React from "react";
import SingleWorkoutBox from "../../components/workout/SingleWorkoutBox";
import { TextInput } from "react-native-paper";

export default function ShowWorkouts() {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <TextInput label={"Search for workout"} style={{ width: "90%" }} />
      <FlatList
        data={[
          { key: "Alan" },
          { key: "Alan" },
          { key: "Alan" },
          { key: "Alan" },
        ]}
        style={{ width: "100%" }}
        numColumns={2}
        renderItem={({ item }) => <SingleWorkoutBox />}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
