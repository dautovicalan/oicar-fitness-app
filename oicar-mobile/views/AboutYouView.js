import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";

export default function AboutYouView({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.row}>
        <Text>Your Birthday</Text>
        <Button mode="contained">Select Date</Button>
      </View>
      <View style={style.row}>
        <Text>Your Height</Text>
        <Button mode="contained">Select Date</Button>
      </View>
      <View style={style.row}>
        <Text>Weight</Text>
        <Button mode="contained">Select Date</Button>
      </View>
      <Button
        mode="contained"
        style={{ width: "80%" }}
        onPress={() => navigation.navigate("Goal")}
      >
        Next
      </Button>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
