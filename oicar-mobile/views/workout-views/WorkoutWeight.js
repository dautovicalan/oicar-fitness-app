import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

export default function WorkoutWeight({ navigation, route }) {
  const finalObject = route.params;

  const [weight, setWeight] = useState("");

  const handleClick = () => {};

  console.log(finalObject);
  return (
    <View style={style.container}>
      <Text>Workout Weight</Text>
      <TextInput
        label={"Weight lifted"}
        style={style.inputField}
        value={weight}
        keyboardType="decimal-pad"
        onChangeText={(text) => setWeight(text)}
      />
      <Button mode="contained" onPress={handleClick}>
        Finish
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputField: {
    width: "90%",
  },
});
