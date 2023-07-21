import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
  id: 0,
  name: "",
  surname: "",
  height: 0,
  weight: 0,
  goal: "",
  workoutNumberPerWeek: "",
  newsletter: false,
  accessToken: "",
  setUserInfo: () => {},
  getUserInfo: () => {},
  logout: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    surname: "",
    email: "",
    height: 0,
    weight: 0,
    goal: "",
    workoutNumberPerWeek: 0,
    newsletter: false,
    accessToken: "",
  });

  const setUserInfo = async (userInfo) => {
    const tempUser = {};
    const request = await fetch(
      `http://localhost:5280/api/Account/GetUser?id=${userInfo.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );

    const result = await request.json();
    tempUser.id = result.id;
    tempUser.name = result.name;
    tempUser.surname = result.surname;
    tempUser.email = result.email;
    tempUser.accessToken = userInfo.accessToken;

    const requestPreferences = await fetch(
      `http://localhost:5280/api/UserPreferences/GetUserPreferences?id=${userInfo.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    );

    const resultPreferences = await requestPreferences.json();

    tempUser.height = resultPreferences.height;
    tempUser.weight = resultPreferences.weight;
    tempUser.goal = resultPreferences.goal;
    tempUser.workoutNumberPerWeek = resultPreferences.workoutNumberPerWeek;
    tempUser.newsletter = resultPreferences.newsletter;

    setUser(tempUser);
  };

  const logout = () => {
    setUser({
      id: 0,
      name: "",
      surname: "",
      email: "",
      height: 0,
      weight: 0,
      goal: "",
      workoutNumberPerWeek: "",
      newsletter: false,
      accessToken: "",
    });
  };

  const value = {
    user,
    setUserInfo,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
