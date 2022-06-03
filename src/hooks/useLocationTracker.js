import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLocationTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") {
      localStorage.setItem("path", location.pathname);
    }
  }, [location, location.key]);

  return [location];
};

export default useLocationTracker;
