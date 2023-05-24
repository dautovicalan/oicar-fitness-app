import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import React from "react";

export default function HomeBox({ text, userText, color }) {
  return (
    <View style={[style.container, { backgroundColor: color }]}>
      <Text variant="titleLarge">{text}</Text>
      <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
        {userText}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    padding: 5,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
