import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children, wholeData,userCityName }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(wholeData);
  const [userCity, setUserCity] = useState(userCityName);

  useEffect(() => {
    setUserData(wholeData);
    setUserCity(userCityName)
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        wholeData,
        setUserCity,
        userCity,
        userCityName
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
