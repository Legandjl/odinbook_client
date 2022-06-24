import React, { useContext, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const SocketContextProvider = (props) => {
  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
