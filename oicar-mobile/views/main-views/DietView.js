import { View, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import DateSlider from "../../components/workout/DateSlider";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import AddedFoodBox from "../../components/diet/AddedFoodBox";
import { useUserContext } from "../../context/UserContext";
import { format } from "date-fns";

export default function DietView({ navigation }) {
  const { user } = useUserContext();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateMeals, setSelectedDateMeals] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
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
          setTotalCalories(0);
          return setSelectedDateMeals(null);
        }
        const data = await request.json();
        prepareData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMeal();
  }, [selectedDate]);

  const prepareData = (data) => {
    const filterFoodsByMealType = (data, mealTypeId) =>
      data.filter((meal) => meal.mealType.id === mealTypeId);

    const mapFoodsWithMealId = (foods, mealId) =>
      foods.map((food) => ({ ...food, idMeal: mealId }));

    const calculateTotalCalories = (foods) =>
      foods.reduce((total, food) => total + food.caloriesPer100g, 0);

    const breakfast = filterFoodsByMealType(data, 1);
    const breakfastFoods = breakfast.flatMap((meal) =>
      mapFoodsWithMealId(meal.foods, meal.id)
    );

    const lunch = filterFoodsByMealType(data, 2);
    const lunchFoods = lunch.flatMap((meal) =>
      mapFoodsWithMealId(meal.foods, meal.id)
    );

    const dinner = filterFoodsByMealType(data, 3);
    const dinnerFoods = dinner.flatMap((meal) =>
      mapFoodsWithMealId(meal.foods, meal.id)
    );

    const totalCaloriesCounter =
      calculateTotalCalories(breakfastFoods) +
      calculateTotalCalories(lunchFoods) +
      calculateTotalCalories(dinnerFoods);

    setTotalCalories(totalCaloriesCounter);
    setSelectedDateMeals({
      breakfast: breakfastFoods,
      lunch: lunchFoods,
      dinner: dinnerFoods,
    });
  };

  const deleteFoodFromMeal = (idMeal, idFood) => {
    Alert.alert("Delete food", "Are you sure you want to delete this food?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          setLoading(true);
          try {
            const request = await fetch(
              `http://localhost:5280/api/Meal/DeleteFood?idMeal=${idMeal}&idFood=${idFood}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (request.status === 200) {
              setSelectedDate(new Date(selectedDate));
            } else {
              throw new Error("Something went wrong");
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

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
        Total Calories: {totalCalories}
      </Text>
      {loading && <ActivityIndicator animating={true} />}
      <ScrollView contentContainerStyle={style.mainSection}>
        <View style={style.mealColumn}>
          <View style={style.row}>
            <Text variant="titleMedium">Breakfast</Text>
            <Text>Calories</Text>
          </View>
          {selectedDateMeals &&
            selectedDateMeals?.breakfast &&
            selectedDateMeals.breakfast.map((food) => {
              return (
                <AddedFoodBox
                  key={food.id}
                  food={food.name}
                  deleteFood={() => deleteFoodFromMeal(food.idMeal, food.id)}
                  calories={food.caloriesPer100g}
                />
              );
            })}
          <View>
            <Button
              icon={"plus"}
              mode="contained"
              disabled={loading}
              onPress={() =>
                navigation.navigate("Search Food", {
                  mealTypeId: 1,
                  selectedDate: format(selectedDate, "yyyy-MM-dd"),
                })
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
          {selectedDateMeals &&
            selectedDateMeals?.lunch &&
            selectedDateMeals.lunch.map((food) => {
              return (
                <AddedFoodBox
                  key={food.id}
                  food={food.name}
                  deleteFood={() => deleteFoodFromMeal(food.idMeal, food.id)}
                  calories={food.caloriesPer100g}
                />
              );
            })}
          <Button
            icon={"plus"}
            mode="contained"
            disabled={loading}
            onPress={() =>
              navigation.navigate("Search Food", {
                mealTypeId: 2,
                selectedDate: format(selectedDate, "yyyy-MM-dd"),
              })
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
          {selectedDateMeals &&
            selectedDateMeals?.dinner &&
            selectedDateMeals.dinner.map((food) => {
              return (
                <AddedFoodBox
                  key={food.id}
                  food={food.name}
                  deleteFood={() => deleteFoodFromMeal(food.idMeal, food.id)}
                  calories={food.caloriesPer100g}
                />
              );
            })}
          <Button
            icon={"plus"}
            mode="contained"
            disabled={loading}
            onPress={() =>
              navigation.navigate("Search Food", {
                mealTypeId: 3,
                selectedDate: format(selectedDate, "yyyy-MM-dd"),
              })
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
