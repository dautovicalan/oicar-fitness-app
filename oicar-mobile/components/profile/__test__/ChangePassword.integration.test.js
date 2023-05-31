import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ChangePasswordDialog from "../ChangePasswordDialog";
import { UserContextProvider } from "../../../context/UserContext";

describe("ChangePasswordDialog", () => {
  xit("should handle change password flow correctly", async () => {
    const setVisible = jest.fn();
    const { getByLabelText, getByText } = render(
      <UserContextProvider>
        <ChangePasswordDialog visible={true} setVisible={setVisible} />
      </UserContextProvider>
    );

    // Fill the input fields
    const newPasswordInput = getByLabelText("New Password");
    const repeatNewPasswordInput = getByLabelText("Repeat New Password");
    fireEvent.changeText(newPasswordInput, "newPassword");
    fireEvent.changeText(repeatNewPasswordInput, "newPassword");

    // Simulate button press to change password
    const changeButton = getByText("Change");
    fireEvent.press(changeButton);

    // Check if the loading state is activated
    expect(changeButton.props.disabled).toBeTruthy();

    // Wait for the API request to complete (or mock the API call using a library like `msw` or `nock`)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if the loading state is deactivated
    expect(changeButton.props.disabled).toBeFalsy();

    // Check if the password has been changed
    expect(setVisible).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith("Password changed");
  });
});
