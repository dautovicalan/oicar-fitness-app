import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { useUserContext } from "../../context/UserContext";
import { textInputStyles } from "../../styles/TextInputStyles";
import useFetch from "../../hooks/useFetch";
import { set } from "date-fns";

export default function AddFood({ navigation, route }) {
  const { foodId, mealTypeId, selectedDate } = route.params;
  const { user } = useUserContext();

  const { data, isPending, error } = useFetch(
    `http://localhost:5280/api/Food/GetById?idFood=${foodId}`
  );

  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);

  const [quantity, setQuantity] = useState("100");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCalories(data.caloriesPer100g);
      setProtein(data.proteinsPer100g);
    }
  }, [data]);

  const handleQuantityChange = (text) => {
    if (text.length === 0) return setQuantity("0");
    const formattedNumber = text.replace(/[^0-9]/g, "");
    setQuantity(formattedNumber);
    setCalories(
      Math.round((data.caloriesPer100g / 100) * parseFloat(formattedNumber))
    );
    setProtein(
      Math.round((data.proteinsPer100g / 100) * parseFloat(formattedNumber))
    );
  };

  const handlePress = async () => {
    setLoading(true);
    try {
      const request = await fetch(`http://localhost:5280/api/Meal/Create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUser: user.id,
          mealTypeId: mealTypeId,
          date: selectedDate,
        }),
      });
      const response = await request.json();
      if (response && response?.id) {
        const requestInsertFood = await fetch(
          `http://localhost:5280/api/Meal/AddFood?idMeal=${response.id}&foodId=${foodId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (requestInsertFood.status === 200) {
          Alert.alert("Success", "Food added to your diet", [
            {
              text: "OK",
              onPress: () =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Diet Dashboard" }],
                }),
            },
          ]);
        }
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        {isPending ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <Text variant="headlineLarge" style={{ textAlign: "center" }}>
              {name}
            </Text>
            <TextInput
              label="Quantity in Grams"
              keyboardType="numeric"
              disabled={loading}
              style={textInputStyles.textInput}
              value={quantity}
              onChangeText={handleQuantityChange}
            />
            <View style={style.nutritionRow}>
              <View style={[style.circle, { borderColor: "red" }]}>
                <Text variant="titleMedium">{calories}</Text>
                <Text variant="titleSmall">Cal.</Text>
              </View>
              <View style={[style.circle, { borderColor: "green" }]}>
                <Text variant="titleMedium">{protein}</Text>
                <Text variant="titleSmall">Protein</Text>
              </View>
            </View>
            <Button
              mode="contained"
              icon={"plus"}
              onPress={handlePress}
              disabled={loading}
            >
              Add
            </Button>
          </>
        )}
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
