import { View, StyleSheet, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import PersonalRecordBox from "../../components/workout/PersonalRecordBox";
import { useUserContext } from "../../context/UserContext";
import { readFromStorage, writeToStorage } from "../../utils/StorageUtils";
import { useFocusEffect } from "@react-navigation/native";

export default function PersonalRecordView({ navigation }) {
  const { user } = useUserContext();
  const [personalRecords, setPersonalRecords] = useState([]);

  useEffect(() => {
    const getPersonalRecords = async () => {
      const personalRecords = await readFromStorage(
        user.id + "_" + "personalRecords"
      );
      if (personalRecords === null || personalRecords === undefined) {
        return setPersonalRecords([]);
      }
      console.log(personalRecords);
      setPersonalRecords(personalRecords);
    };

    getPersonalRecords();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getPersonalRecords = async () => {
        const personalRecords = await readFromStorage(
          user.id + "_" + "personalRecords"
        );
        if (personalRecords === null || personalRecords === undefined) {
          return setPersonalRecords([]);
        }
        setPersonalRecords(personalRecords);
      };

      getPersonalRecords();
    }, [])
  );

  return (
    <View style={style.container}>
      {personalRecords?.length === 0 ? (
        <Text>You have no personal records yet</Text>
      ) : (
        <FlatList
          contentContainerStyle={style.prs}
          data={personalRecords}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <PersonalRecordBox
              {...item.item}
              onLongPress={async () => {
                const newPersonalRecords = personalRecords.filter(
                  (pr) => pr.id !== item.item.id
                );
                try {
                  await writeToStorage(
                    user.id + "_" + "personalRecords",
                    newPersonalRecords
                  );
                  setPersonalRecords(newPersonalRecords);
                } catch (error) {
                  console.error(error);
                  Alert.alert("Error", "Something went wrong");
                }
              }}
              workoutDate={item.item.workoutDate}
              renderFullWidth={
                personalRecords.length % 2 !== 0 &&
                item.index === personalRecords.length - 1
              }
            />
          )}
        />
      )}

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
