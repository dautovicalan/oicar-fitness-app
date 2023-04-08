import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";

export default function WorkoutRepetition({ navigation }) {
  const [repetition, setRepetition] = useState(1);

  const handleClick = () => {
    if (!repetition) {
      return Alert.alert("Select repetition");
    }
    navigation.navigate("Workout Weight");
  };

  return (
    <View style={stlye.container}>
      <Text>Workout Repetition</Text>
      <Picker
        selectedValue={repetition}
        onValueChange={(itemValue, itemIndex) => setRepetition(itemValue)}
        style={{ width: 100, height: 200 }}
      >
        <Picker.Item key={1} label="1" value={1} />
        <Picker.Item key={2} label="2" value={2} />
        <Picker.Item key={3} label="3" value={3} />
        <Picker.Item key={4} label="4" value={4} />
        <Picker.Item key={5} label="5" value={5} />
      </Picker>
      <Button mode="contained" onPress={handleClick}>
        Next
      </Button>
    </View>
  );
}

const stlye = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
