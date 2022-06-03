import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./header.css";
import SearchBox from "../search/SearchBox";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const { socket } = useContext(SocketContext);
  const { logout, token } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
  //resets window pos on nav

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
  };

  useEffect(() => {
    setLoading(true);
    if (searchQuery.length > 0) {
      socket.emit("search", searchQuery);
    }
    socket.on("result", (res) => {
      console.log(res);
      setSearchRes(res);
      setLoading(false);
    });
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [searchQuery, socket]);

  return (
    <div className="header">
      <div className="logo">
        <div className="logoInner">LOGO</div>
      </div>
      {token && (
        <div className={"searchWrap"}>
          <input
            placeholder="Find someone"
            className="searchBox"
            type={"text"}
            value={searchQuery}
            onChange={handleChange}
          />
          {searchQuery.length > 0 && (
            <SearchBox loading={loading} results={searchRes} />
          )}
        </div>
      )}{" "}
      {token && <i onClick={logout} class="ri-logout-circle-line"></i>}
    </div>
  );
};

export default Header;
