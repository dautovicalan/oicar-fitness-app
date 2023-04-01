import React, { useContext, useState } from "react";

export const RegistrationProcessContext = React.createContext({
  currentNewUser: {},
  setBasicInfo: (userBasicInfo) => {},
  setAboutYouInfo: (aboutYouInfo) => {},
  setGoal: (goalInfo) => {},
  setNumberOfWorkouts: (workoutsInfo) => {},
});

export const useRegistrationProcess = () => {
  return useContext(RegistrationProcessContext);
};

export const RegistrationProcessContextProvider = ({ children }) => {
  const [currentNewUser, setCurrentNewUser] = useState({
    name: "",
    surname: "",
    email: "",
    birthday: "",
    height: 0,
    weight: 0,
    goal: "",
    workoutsNumber: 0,
  });

  const setBasicInfo = (userBasicInfo) => {
    if (setBasicInfo) {
      setCurrentNewUser((prevVal) => {
        return {
          ...prevVal,
          name: userBasicInfo.name,
          surname: userBasicInfo.surname,
          email: userBasicInfo.email,
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
        workoutsNumber: workoutsInfo,
      };
    });
  };

  const value = {
    currentNewUser,
    setBasicInfo,
    setAboutYouInfo,
    setGoal,
    setNumberOfWorkouts,
  };

  return (
    <RegistrationProcessContext.Provider value={value}>
      {children}
    </RegistrationProcessContext.Provider>
  );
};
