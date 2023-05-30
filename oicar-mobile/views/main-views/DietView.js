import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import AddedFoodBox from "../../components/diet/AddedFoodBox";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";
import { ca } from "date-fns/locale";

export default function DietView({ navigation }) {
  const { user } = useUserContext();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateMeals, setSelectedDateMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMeal = async () => {
      setLoading(true);
      try {
        const request = await fetch(
          `http://localhost:5280/api/Meal/ByDate?idUser=${
            user.id
          }&date=${format(selectedDate, "yyyy-MM-dd")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (request.status === 404) {
        }
        console.log("HELLO" + request.status);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMeal();
  }, [selectedDate]);

  return (
    <View style={style.container}>
      <DateSlider
        selectedDate={selectedDate}
        setSelectedDate={(date) => setSelectedDate(date)}
      />
      <Text
        variant="titleMedium"
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Total Calories: 1,852
      </Text>
      {loading && <ActivityIndicator animating={true} />}
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
                navigation.navigate("Search Food", { mealTypeId: 1 })
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
              navigation.navigate("Search Food", { mealTypeId: 2 })
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
              navigation.navigate("Search Food", { mealTypeId: 3 })
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
