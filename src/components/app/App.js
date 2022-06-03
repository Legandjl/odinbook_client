import { SocketContextProvider } from "../../context/SocketContext";
import { Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import "./App.css";
import ResultsPage from "../search/ResultsPage";
import Home from "../home/Home";
import Page from "../user/Page";
import Login from "../auth/Login";
import { UserContextProvider } from "../../context/UserContext";
import ProtectedRoute from "../protected/ProtectedRoute";

function App() {
  return (
    <SocketContextProvider>
      <UserContextProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/login"} element={<Login />} />
            <Route
              path={"/home"}
              element={
                <ProtectedRoute>
                  {" "}
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/search/:query"}
              element={
                <ProtectedRoute>
                  {" "}
                  <ResultsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/user/page"}
              element={
                <ProtectedRoute>
                  {" "}
                  <Page />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </UserContextProvider>
    </SocketContextProvider>
  );
}

export default App;
