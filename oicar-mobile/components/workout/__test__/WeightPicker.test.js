import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WeightPicker from "../../WeightPicker";

describe("WeightPicker", () => {
  test("should call onWeightChange when the weight value is changed", () => {
    const onWeightChange = jest.fn();
    const { getByTestId } = render(
      <WeightPicker
        selectedWeight={50}
        onWeightChange={onWeightChange}
        width={300}
      />
    );

    const picker = getByTestId("weight-picker");
    fireEvent(picker, "valueChange", "60");

    expect(onWeightChange).toHaveBeenCalledTimes(1);
    expect(onWeightChange).toHaveBeenCalledWith("60");
  });
});
