import React, { useContext, useEffect, useState } from "react";
import useLocationTracker from "../hooks/useLocationTracker";
import useAuthenticate from "../hooks/useAuthenticate";
import { SocketContext } from "./SocketContext";

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const { socket } = useContext(SocketContext);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [login, logout] = useAuthenticate({ setLoading, setToken, setUser });

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("user", user._id);
      //add user to online users in server
      if (!user) {
        socket.disconnect();
      }
      return () => {
        socket.disconnect();
      };
    }
  }, [socket, user]);

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
          const user = await testLogin.json();
          localStorage.setItem("token", localToken);
          setUser(user);
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
    <AuthContext.Provider value={{ logout, login, token, loading, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
