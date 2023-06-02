import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import ExerciseMuscleBox from "../../components/workout/ExerciseMuscleBox";
import useFetch from "../../hooks/useFetch";
import { textInputStyles } from "../../styles/TextInputStyles";

export default function AddWorkoutView({ route, navigation }) {
  const { selectedDate, workoutId, workoutName } = route.params;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { data, isPending, error } = useFetch(
    "http://localhost:5280/api/Exercise/GetBodyParts",
    "GET"
  );

  const filterData = (text) => {
    if (text.length === 0) {
      setFilteredData([]);
      setSearchTerm(text);
      return;
    }

    const formattedQuery = text.toLowerCase();
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(formattedQuery);
    });
    setFilteredData(filteredData);
    setSearchTerm(text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <TextInput
          label={"Search workouts"}
          value={searchTerm}
          style={[textInputStyles.textInput, { width: "90%" }]}
          onChangeText={filterData}
        />
        {isPending ? (
          <ActivityIndicator animating={true} />
        ) : (
          <FlatList
            contentContainerStyle={{ width: "90%", marginBottom: 20 }}
            data={filteredData.length == 0 ? data : filteredData}
            renderItem={(item) => (
              <ExerciseMuscleBox
                muscleId={item.item.id}
                muscleName={item.item.name}
                navigation={() =>
                  navigation.navigate("Add Specific Exercise", {
                    muscleId: item.item.id,
                    muscleName: item.item.name,
                    selectedDate,
                    workoutId,
                    workoutName,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
        {error && <Text>Error: {error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
