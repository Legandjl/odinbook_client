import React, { useEffect, useState } from "react";
import useLocationTracker from "../hooks/useLocationTracker";
import useLogin from "../hooks/useAuthenticate";

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [login, logout] = useLogin({ setLoading, setToken });

  useLocationTracker();

  useEffect(() => {
    const login = async () => {
      try {
        setLoading(true);
        const localToken = localStorage.getItem("token");
        if (!localToken) {
          return;
        }
        const testLogin = await fetch("http://localhost:3001/post/test", {
          method: "GET",
          headers: { Authorization: `Bearer ${localToken}` },
        });

        if (testLogin.status === 401) {
          //auth failed, clear all and set loading to false
          logout();
        } else {
          //Authenticated
          localStorage.setItem("token", localToken);
          setToken(localToken);
        }
        setLoading(false);
      } catch (e) {
        logout();
      }
    };
    if (!loading && !token) {
      login();
    }
  }, [loading, logout, token]);

  return (
    <AuthContext.Provider value={{ logout, login, token, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
