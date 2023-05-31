import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DateSlider from "../DateSlider";

describe("DateSlider", () => {
  test("should call setSelectedDate when a day is pressed", () => {
    const setSelectedDate = jest.fn();
    const { getAllByTestId } = render(
      <DateSlider selectedDate={new Date()} setSelectedDate={setSelectedDate} />
    );

    const days = getAllByTestId("day");
    fireEvent.press(days[0]);

    expect(setSelectedDate).toHaveBeenCalledTimes(1);
    expect(setSelectedDate).toHaveBeenCalledWith(expect.any(Date));
  });
});
