import { View, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import PersonalRecordBox from "../../components/workout/PersonalRecordBox";

export default function PersonalRecordView({ navigation }) {
  const [searchPersonalRecord, setSearchPersonalRecord] = useState("");
  const [personalRecords, setPersonalRecords] = useState([
    {
      id: 1,
      workoutDate: new Date(),
      workoutName: "Bench Press",
      workoutWeight: 100,
    },
    {
      id: 2,
      workoutDate: new Date(),
      workoutName: "Something",
      workoutWeight: 100,
    },
    {
      id: 3,
      workoutDate: new Date(),
      workoutName: "something again",
      workoutWeight: 100,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleFilter = () => {
    const filtered = personalRecords.filter((pr) => {
      return pr.workoutName.includes(searchPersonalRecord);
    });
    setPersonalRecords(filtered);
  };

  return (
    <View style={style.container}>
      <FlatList
        contentContainerStyle={style.prs}
        data={personalRecords}
        numColumns={2}
        renderItem={(item) => (
          <PersonalRecordBox
            {...item.item}
            workoutDate={item.item.workoutDate.toDateString()}
            renderFullWidth={
              personalRecords.length % 2 !== 0 &&
              item.index === personalRecords.length - 1
            }
          />
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Add Personal Record")}
        style={{ marginVertical: 10 }}
      >
        Add New PR
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  prs: {
    alignItems: "center",
  },
});
