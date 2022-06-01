import { SocketContextProvider } from "../../context/SocketContext";
import Header from "../header/Header";
import "./App.css";

function App() {
  return (
    <SocketContextProvider>
      <div className="App">
        <Header />
      </div>
    </SocketContextProvider>
  );
}

export default App;
