import { Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import "./App.css";
import ResultsPage from "../search/ResultsPage";
import Home from "../home/Home";
import Page from "../user/page/Page";
import Login from "../auth/Login";
import ProtectedRoute from "../protected/ProtectedRoute";
import { FileContextProvider } from "../../context/FileContext";
import Unauthorised from "../error/Unauthorised";
import Footer from "../footer/Footer";

function App() {
  return (
    <FileContextProvider>
      {" "}
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
            path={"/user/:id"}
            element={
              <ProtectedRoute>
                {" "}
                <Page />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorised" element={<Unauthorised />} />
        </Routes>
        <Footer />
      </div>
    </FileContextProvider>
  );
}

export default App;
