import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import SingleWorkoutBox from "../../components/workout/SingleWorkoutBox";
import { TextInput } from "react-native-paper";

export default function ShowWorkouts({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={style.container}>
      <TextInput
        label={"Search for workout"}
        style={{ width: "90%" }}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <FlatList
        data={[
          { key: "Alan" },
          { key: "Pero" },
          { key: "Sero" },
          { key: "Mero" },
          { key: "kero1" },
          { key: "ker2" },
        ]}
        contentContainerStyle={style.listContainer}
        numColumns={2}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <SingleWorkoutBox
            navigation={() =>
              navigation.navigate("Single Workouts", {
                workoutId: 1,
              })
            }
          />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  listContainer: {
    alignItems: "center",
  },
});
