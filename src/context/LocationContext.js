import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LocationContext = React.createContext();

const LocationContextProvider = (props) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.setItem("path", location.pathname);
    }
  }, [location, location.key]);

  return <LocationContext.Provider>{props.children}</LocationContext.Provider>;
};

export { LocationContext, LocationContextProvider };
