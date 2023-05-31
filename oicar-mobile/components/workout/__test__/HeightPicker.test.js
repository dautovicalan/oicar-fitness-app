import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HeightPicker from "../../HeightPicker";

describe("HeightPicker", () => {
  test("should call onHeightChange when the height value is changed", () => {
    const onHeightChange = jest.fn();
    const { getByTestId } = render(
      <HeightPicker
        selectedHeight={150}
        onHeightChange={onHeightChange}
        width={300}
      />
    );

    const picker = getByTestId("height-picker");
    fireEvent(picker, "valueChange", "160");

    expect(onHeightChange).toHaveBeenCalledTimes(1);
    expect(onHeightChange).toHaveBeenCalledWith("160");
  });
});
