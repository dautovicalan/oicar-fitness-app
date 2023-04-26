import {
  View,
  Text,
  StyleSheet,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
import React from "react";

export default function SingleUserExerciseDetailsView({ route }) {
  const { exerciseId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{exerciseId}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
