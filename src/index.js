import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import { AuthContextProvider } from "./context/AuthContext";
import "remixicon/fonts/remixicon.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SocketContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SocketContextProvider>
  </BrowserRouter>
);
