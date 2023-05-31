import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EditProfile from "../EditProfile";
import { UserContextProvider } from "../../../context/UserContext";

describe("EditProfile", () => {
  xit("should handle profile update correctly", async () => {
    const onSave = jest.fn();
    const userData = {
      id: "user123",
      weight: 70,
      height: 170,
      goal: "Lose weight",
      workoutNumberPerWeek: 3,
      newsletter: true,
      accessToken: "token123",
    };
    const { getByText, getByLabelText } = render(
      <UserContextProvider>
        <EditProfile onSave={onSave} userData={userData} />
      </UserContextProvider>
    );

    // Change weight value
    const weightInput = getByLabelText("Weight");
    fireEvent(weightInput, "valueChange", "75");

    // Change height value
    const heightInput = getByLabelText("Height");
    fireEvent(heightInput, "valueChange", "175");

    // Change goal value
    const goalButton = getByText("Lose weight");
    fireEvent.press(goalButton);

    // Change workout number per week value
    const workoutButton = getByText("3 workouts per week");
    fireEvent.press(workoutButton);

    // Toggle newsletter subscription
    const newsletterSwitch = getByLabelText("Newsletter");
    fireEvent(newsletterSwitch, "valueChange", false);

    // Simulate button press to save profile
    const saveButton = getByText("Save");
    fireEvent.press(saveButton);

    // Check if the loading state is activated
    expect(saveButton.props.disabled).toBeTruthy();

    // Wait for the API request to complete (or mock the API call using a library like `msw` or `nock`)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if the loading state is deactivated
    expect(saveButton.props.disabled).toBeFalsy();

    // Check if the profile has been updated
    expect(Alert.alert).toHaveBeenCalledWith(
      "Success",
      "Your profile has been updated"
    );

    // Check if the `onSave` callback has been called
    expect(onSave).toHaveBeenCalled();
  });
});
