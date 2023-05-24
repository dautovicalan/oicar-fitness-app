import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import AddedFoodBox from "../../components/diet/AddedFoodBox";
import { useUserContext } from "../../context/UserContext";

export default function DietView({ navigation }) {
  const { user } = useUserContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={style.container}>
      <DateSlider
        selectedDate={selectedDate}
        setSelectedDate={(date) => setSelectedDate(date)}
      />
      <Text
        variant="titleMedium"
        style={{ fontWeight: "bold", textAlign: "center", marginVertical: 10 }}
      >
        Total Calories: 1,852
      </Text>
      <ScrollView contentContainerStyle={style.mainSection}>
        <View style={style.mealColumn}>
          <View style={style.row}>
            <Text variant="titleMedium">Breakfast</Text>
            <Text>Calories</Text>
          </View>
          <AddedFoodBox food={"Sandwich"} calories={600} />
          <View>
            <Button
              icon={"plus"}
              mode="contained"
              onPress={() =>
                navigation.navigate("Search Food", { mealType: "breakfast" })
              }
            >
              Add Food
            </Button>
          </View>
        </View>
        <View style={style.mealColumn}>
          <View style={style.row}>
            <Text variant="titleMedium">Lunch</Text>
            <Text>Calories</Text>
          </View>
          <AddedFoodBox food={"Bolognese"} calories={400} />
          <AddedFoodBox food={"Bolognese"} calories={400} />
          <Button
            icon={"plus"}
            mode="contained"
            onPress={() =>
              navigation.navigate("Search Food", { mealType: "lunch" })
            }
          >
            Add Food
          </Button>
        </View>
        <View style={style.mealColumn}>
          <View style={style.row}>
            <Text variant="titleMedium">Dinner</Text>
            <Text>Calories</Text>
          </View>
          <AddedFoodBox food={"Bannan"} calories={200} />
          <Button
            icon={"plus"}
            mode="contained"
            onPress={() =>
              navigation.navigate("Search Food", { mealType: "dinner" })
            }
          >
            Add Food
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainSection: {
    justifyContent: "space-between",
    marginHorizontal: 10,
    gap: 10,
    paddingBottom: 10,
  },
  mealColumn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
