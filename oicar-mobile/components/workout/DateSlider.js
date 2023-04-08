import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

const DateSlider = () => {
  const [dates, setDates] = useState([
    { id: "1", date: "2022-01-01" },
    { id: "2", date: "2022-01-02" },
    { id: "3", date: "2022-01-03" },
    { id: "4", date: "2022-01-04" },
    { id: "5", date: "2022-01-05" },
    { id: "6", date: "2022-01-06" },
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.date}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "10%",
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DateSlider;
