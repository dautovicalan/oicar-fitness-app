import React, { useContext, useState } from "react";

export const RegistrationProcessContext = React.createContext({
  currentNewUser: {
    id: 0,
    name: "",
    surname: "",
    email: "",
    isRegister: false,
    birthday: "",
    height: 0,
    weight: 0,
    goal: "",
    workoutsNumber: 0,
    newsletter: true,
  },
  setBasicInfo: (userBasicInfo) => {},
  setAboutYouInfo: (aboutYouInfo) => {},
  setGoal: (goalInfo) => {},
  setNumberOfWorkouts: (workoutsInfo) => {},
  setEnableNewsletter: (enableNewsletter) => {},
});

export const useRegistrationProcess = () => {
  return useContext(RegistrationProcessContext);
};

export const RegistrationProcessContextProvider = ({ children }) => {
  const [currentNewUser, setCurrentNewUser] = useState({
    id: 0,
    name: "",
    surname: "",
    email: "",
    isRegister: false,
    birthday: "",
    height: 0,
    weight: 0,
    goal: "",
    workoutNumberPerWeek: 0,
    newsletter: true,
  });

  const setBasicInfo = (userBasicInfo) => {
    if (setBasicInfo) {
      setCurrentNewUser((prevVal) => {
        return {
          ...prevVal,
          id: userBasicInfo.id,
          isRegister: userBasicInfo.isRegister,
        };
      });
    }
  };
  const setAboutYouInfo = (aboutYouInfo) => {
    setCurrentNewUser((prevVal) => {
      return {
        ...prevVal,
        birthday: aboutYouInfo.birthday,
        height: aboutYouInfo.height,
        weight: aboutYouInfo.weight,
      };
    });
  };
  const setGoal = (goalInfo) => {
    setCurrentNewUser((prevVal) => {
      return {
        ...prevVal,
        goal: goalInfo,
      };
    });
  };
  const setNumberOfWorkouts = (workoutsInfo) => {
    setCurrentNewUser((prevVal) => {
      return {
        ...prevVal,
        workoutNumberPerWeek: workoutsInfo,
      };
    });
  };
  const setEnableNewsletter = (enableNewsletter) => {
    setCurrentNewUser((prevVal) => {
      return {
        ...prevVal,
        newsletter: enableNewsletter,
      };
    });
  };

  const value = {
    currentNewUser,
    setBasicInfo,
    setAboutYouInfo,
    setGoal,
    setNumberOfWorkouts,
    setEnableNewsletter,
  };

  return (
    <RegistrationProcessContext.Provider value={value}>
      {children}
    </RegistrationProcessContext.Provider>
  );
};
