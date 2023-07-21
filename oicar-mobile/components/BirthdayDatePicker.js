import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BirthdayDatePicker({ userBirthday, onDateChange }) {
  return (
    <DateTimePicker
      value={userBirthday}
      onChange={(date, selectedDate) => onDateChange(selectedDate)}
      maximumDate={new Date()}
    />
  );
}
