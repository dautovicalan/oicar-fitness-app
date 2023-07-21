import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Text, ActivityIndicator } from "react-native-paper";
import { textInputStyles } from "../../styles/TextInputStyles";
import useFetch from "../../hooks/useFetch";

export default function SearchFood({ navigation, route }) {
  const { mealTypeId, selectedDate } = route.params;
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  const { data, isPending, error } = useFetch("http://localhost:5280/api/Food");

  useEffect(() => {
    if (data) {
      setFoods(data);
    }
  }, [data]);

  const handleFilter = (text) => {
    setSearchTerm(text);
    if (text.length === 0) {
      return setFilteredFoods([]);
    }
    const filterData = foods.filter((food) => {
      return food.name.toUpperCase().includes(text.toUpperCase());
    });
    setFilteredFoods(filterData);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <TextInput
          label="Search food"
          value={searchTerm}
          onChangeText={handleFilter}
          style={[{ marginBottom: 10 }, textInputStyles.textInput]}
        />
        {isPending && <ActivityIndicator animating={true} />}
        <FlatList
          contentContainerStyle={{ marginHorizontal: 10 }}
          data={filteredFoods.length > 0 ? filteredFoods : foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Add Food", {
                  foodId: item.id,
                  mealTypeId,
                  selectedDate,
                })
              }
              style={style.foodRow}
            >
              <Text variant="titleMedium">{item.name}</Text>
              <Text style={{ fontWeight: "bold" }}>
                {item.caloriesPer100g} cal.
              </Text>
            </Pressable>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
