import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
  id: 0,
  name: "",
  surname: "",
  setUserInfo: () => {},
  getUserInfo: () => {},
  logut: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    surname: "",
  });

  const setUserInfo = (userInfo) => {
    setUser({
      id: userInfo.id,
      name: userInfo.firstName,
      surname: userInfo.lastName,
    });
  };

  const getUserInfo = () => {
    return user;
  };

  const logut = () => {
    setUser({
      id: 0,
      name: "",
      surname: "",
    });
  };

  const value = {
    user,
    setUserInfo,
    getUserInfo,
    logut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
