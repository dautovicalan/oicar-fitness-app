import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Text } from "react-native-paper";
import useFetch from "../../hooks/useFetch";

export default function SingleTutorialView({ route }) {
  const { workoutId } = route.params;
  // const { data, isPending, error } = useFetch(
  //   `http://localhost:5280/api/Exercise/${workoutId}`
  // );
  const [playing, setPlaying] = useState(false);
  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text variant="bodyLarge" style={{ marginTop: 10 }}>
        Name of the exercise
      </Text>
    </ScrollView>
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
