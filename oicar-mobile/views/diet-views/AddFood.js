import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";

export default function AddFood({ navigation, route }) {
  const { food } = route.params;
  const { user } = useUserContext();

  const [quantity, setQuantity] = useState("100");
  const [calories, setCalories] = useState(120);

  useEffect(() => {
    setCalories(Math.round(quantity * 1.2));
  }, [quantity]);

  const handlePress = async () => {
    // fetch API

    // add to user's diet
    navigation.reset({
      index: 0,
      routes: [{ name: "Diet Dashboard" }],
    });
  };

  const handleChangeText = (text) => {
    const formattedNumber = text.replace(/[^0-9]/g, "");
    setQuantity(formattedNumber);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <Text variant="headlineLarge" style={{ textAlign: "center" }}>
          {food.toUpperCase()}
        </Text>
        <TextInput
          label="Quantity in Grams"
          keyboardType="numeric"
          value={quantity}
          onChangeText={handleChangeText}
        />
        <View style={style.nutritionRow}>
          <View style={[style.circle, { borderColor: "red" }]}>
            <Text variant="titleMedium">{calories}</Text>
            <Text variant="titleSmall">Cal.</Text>
          </View>
          <View style={[style.circle, { borderColor: "green" }]}>
            <Text variant="titleMedium">{calories}</Text>
            <Text variant="titleSmall">Protein</Text>
          </View>
        </View>
        <Button mode="contained" icon={"plus"} onPress={handlePress}>
          Add
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
