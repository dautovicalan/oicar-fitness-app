import { View, Text, Platform, DatePickerIOS } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BirthdayDatePicker() {
  const [date, setDate] = useState(new Date());

  return <DateTimePicker value={date} />;
}
