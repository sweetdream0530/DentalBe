import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  if (shouldRedirect) {
    navigate("/login");
    setShouldRedirect(false);
  }

  return (
    <NavigationContext.Provider value={{ setShouldRedirect }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use the redirect function in other parts of the app
export const useNavigation = () => {
  return useContext(NavigationContext);
};
