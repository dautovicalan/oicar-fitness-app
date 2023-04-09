import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
  id: 0,
  firstName: "",
  lastName: "",
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
  });

  const setUserInfo = (userInfo) => {
    setUser({
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });
  };

  const value = {
    user,
    setUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
