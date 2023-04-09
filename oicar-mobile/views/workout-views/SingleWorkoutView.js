import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { WebView } from "react-native-webview";

export default function SingleWorkoutView({ route }) {
  const { workoutId } = route.params;
  const [playing, setPlaying] = useState(false);
  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text>Single Workout View</Text>
      <Text>ID: {workoutId}</Text>
      <WebView
        style={{ width: 300 }}
        javaScriptEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/rT7DgCr-3pg" }}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
