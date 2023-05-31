import React from "react";
import { render, waitFor } from "@testing-library/react";
import { UserContextProvider, useUserContext } from "../UserContext";

// Mock the useFetch hook
jest.mock("../../hooks/useFetch", () => jest.fn());

describe("UserContextProvider", () => {
  xit("should fetch user info and set it in the context", async () => {
    // Mock the API responses
    const getUserMock = jest.fn().mockResolvedValue({
      id: 123,
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      accessToken: "token",
    });
    const getUserPreferencesMock = jest.fn().mockResolvedValue({
      height: 180,
      weight: 75,
      goal: "lose weight",
      workoutNumberPerWeek: 3,
      newsletter: true,
    });
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.includes("/Account/GetUser")) {
        return Promise.resolve({
          json: () => Promise.resolve(getUserMock()),
        });
      } else if (url.includes("/UserPreferences/GetUserPreferences")) {
        return Promise.resolve({
          json: () => Promise.resolve(getUserPreferencesMock()),
        });
      }
    });

    // Render the component
    render(
      <UserContextProvider>
        <TestComponent />
      </UserContextProvider>
    );

    // Wait for the API requests to resolve
    await waitFor(() => {
      expect(getUserMock).toHaveBeenCalledTimes(1);
      expect(getUserPreferencesMock).toHaveBeenCalledTimes(1);
    });

    // Access the user context
    const { user } = useUserContext();

    // Assertions
    expect(user.id).toBe(123);
    expect(user.name).toBe("John");
    expect(user.surname).toBe("Doe");
    expect(user.email).toBe("john.doe@example.com");
    expect(user.height).toBe(180);
    expect(user.weight).toBe(75);
    expect(user.goal).toBe("lose weight");
    expect(user.workoutNumberPerWeek).toBe(3);
    expect(user.newsletter).toBe(true);
    expect(user.accessToken).toBe("token");
  });
});

// TestComponent is a dummy component to access the user context
const TestComponent = () => {
  const { user } = useUserContext();
  return <div>{user.name}</div>;
};
