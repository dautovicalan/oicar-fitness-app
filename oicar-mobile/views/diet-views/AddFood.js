import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";

export default function AddFood({ navigation, route }) {
  const { food } = route.params;
  const { user } = useUserContext();

  const [quantity, setQuantity] = useState(100);
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

  return (
    <View style={style.container}>
      <Text variant="headlineLarge">{food.toUpperCase()}</Text>
      <TextInput
        label="Quantity in Grams"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />
      <View style={style.nutritionRow}>
        <View style={[style.circle, { borderColor: "red" }]}>
          <Text>{calories}</Text>
          <Text>Cal</Text>
        </View>
        <View style={[style.circle, { borderColor: "green" }]}>
          <Text>{calories}</Text>
          <Text>Protein</Text>
        </View>
      </View>
      <Button mode="contained" icon={"plus"} onPress={handlePress}>
        Add
      </Button>
    </View>
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
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
