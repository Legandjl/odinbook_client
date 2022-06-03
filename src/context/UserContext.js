import React, { useEffect, useState } from "react";
import useLocationTracker from "../hooks/useLocationTracker";

const UserContext = React.createContext();

const UserContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  useLocationTracker();

  useEffect(() => {
    const login = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const testLogin = await fetch("http://localhost:3001/post/test", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (testLogin.status === 401) {
          //auth failed, clear all and set loading to false
          logout();
        } else {
          //Authenticated
          localStorage.setItem("token", token);
          setToken(token);
        }
        setLoading(false);
      } catch (e) {
        logout();
      }
    };
    if (!loading && !token) {
      login();
    }
  }, [loading, token]);

  const handleLogin = async (password) => {
    try {
      setLoading(true);
      const data = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: "testemail@gmail.com",
          password: "9114",
        }),
      });
      const jsonData = await data.json();
      localStorage.setItem("token", jsonData.token);
      setToken(jsonData.token);
      setLoading(false);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    setToken(null);
    localStorage.setItem("token", "");
    localStorage.setItem("path", "");
  };

  return (
    <UserContext.Provider value={{ logout, handleLogin, token, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
