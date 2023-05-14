import { View, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Text } from "react-native-paper";

const data = ["apple", "banana", "orange", "pear", "grape", "pineapple"];

export default function SearchFood({ navigation, route }) {
  const { mealType } = route.params;
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // fetch API
    if (data) {
      setFoods(data);
    }
    if (searchTerm === "") {
      setFoods(data);
    } else {
      const filtered = foods.filter((food) => {
        return food.toUpperCase().includes(searchTerm.toUpperCase());
      });
      setFoods(filtered);
    }
  }, [searchTerm]);

  return (
    <View style={style.container}>
      <TextInput
        label="Search food"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{ marginBottom: 10 }}
      />
      <FlatList
        contentContainerStyle={{ marginHorizontal: 10 }}
        data={foods}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Add Food", {
                food: item,
              })
            }
            style={style.foodRow}
          >
            <Text variant="titleMedium">{item}</Text>
            <Text style={{ fontWeight: "bold" }}>123 cal.</Text>
          </Pressable>
        )}
      />
    </View>
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
