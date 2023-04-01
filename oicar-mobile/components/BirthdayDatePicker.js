import { View, Text, Platform, DatePickerIOS } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BirthdayDatePicker({ selectedDate, onDateChange }) {
  return (
    <DateTimePicker
      value={selectedDate}
      onChange={(date) => onDateChange(date)}
      maximumDate={new Date()}
    />
  );
}
