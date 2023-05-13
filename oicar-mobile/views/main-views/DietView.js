import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";

export default function DietView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={style.container}>
      <DateSlider
        selectedDate={selectedDate}
        setSelectedDate={(date) => setSelectedDate(date)}
      />
      <Text>Total Calories</Text>
      <View style={style.mainSection}>
        <View>
          <View style={style.row}>
            <Text variant="titleMedium">Breakfast</Text>
            <Text>Calories</Text>
          </View>
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
        <View>
          <View style={style.row}>
            <Text variant="titleMedium">Lunch</Text>
            <Text>Calories</Text>
          </View>
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
        <View>
          <View style={style.row}>
            <Text variant="titleMedium">Dinner</Text>
            <Text>Calories</Text>
          </View>
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
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainSection: {
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "cyan",
    width: "100%",
    padding: 10,
  },
});
