import React from "react";
import { render, fireEvent, renderHook } from "@testing-library/react";
import {
  RegistrationProcessContextProvider,
  useRegistrationProcess,
} from "../RegistrationProcessContext";

describe("RegistrationProcessContextProvider", () => {
  xit("should update the registration process context correctly", () => {
    // const { getByText } = render(
    //   <RegistrationProcessContextProvider>
    //     <TestComponent />
    //   </RegistrationProcessContextProvider>
    // );

    const wrapper = ({ children }) => (
      <RegistrationProcessContextProvider>
        {children}
      </RegistrationProcessContextProvider>
    );

    const { result } = renderHook(() => useRegistrationProcess(), { wrapper });
    const {
      currentNewUser,
      setBasicInfo,
      setAboutYouInfo,
      setGoal,
      setNumberOfWorkouts,
      setEnableNewsletter,
    } = result.current;

    setBasicInfo({ id: 1, isRegister: true });

    expect(currentNewUser.id).toBe(1);
    expect(currentNewUser.isRegister).toBe(true);

    setAboutYouInfo({ birthday: "2000-01-01", height: 180, weight: 75 });

    expect(currentNewUser.birthday).toBe("2000-01-01");
    expect(currentNewUser.height).toBe(180);
    expect(currentNewUser.weight).toBe(75);

    setGoal("lose weight");

    expect(currentNewUser.goal).toBe("lose weight");

    setNumberOfWorkouts(3);

    expect(currentNewUser.workoutNumberPerWeek).toBe(3);

    setEnableNewsletter(false);

    expect(currentNewUser.newsletter).toBe(false);
  });
});

// TestComponent is a dummy component to access the registration process context
// const TestComponent = () => {
//   const { currentNewUser } = useRegistrationProcess();
//   return (
//     <div>
//       <span>{currentNewUser.id}</span>
//       <span>{currentNewUser.isRegister ? "Registered" : "Not Registered"}</span>
//     </div>
//   );
// };
