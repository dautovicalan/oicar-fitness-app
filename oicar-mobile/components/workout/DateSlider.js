import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isEqual,
  subDays,
} from "date-fns";

import PagerView from "react-native-pager-view";

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: new Date(),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);

  return acc;
}, []);

const DateSlider = ({ selectedDate, setSelectedDate }) => {
  return (
    <PagerView style={styles.container} initialPage={dates.length - 1}>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <View style={styles.row}>
              {week.map((day) => {
                const txt = format(day, "EEEEE");
                const dateWithoutTime = selectedDate.setHours(0, 0, 0, 0);
                return (
                  <Pressable
                    testID="day"
                    key={day}
                    onPress={() => setSelectedDate(day)}
                  >
                    <View
                      style={[
                        styles.day,
                        isEqual(dateWithoutTime, day) ? styles.selectedDay : {},
                      ]}
                    >
                      <Text>{txt}</Text>
                      <Text>
                        {day.getDate()}.{day.getMonth() + 1}.
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxHeight: "15%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  day: {
    alignItems: "center",
    padding: 3,
  },
  selectedDay: {
    backgroundColor: "orange",
    borderRadius: 5,
  },
});

export default DateSlider;
