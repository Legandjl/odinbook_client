import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./header.css";
import SearchBox from "../search/SearchBox";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useShowMenu from "../../hooks/useShowMenu";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const { socket } = useContext(SocketContext);
  const { logout, token, user } = useContext(AuthContext);
  const [showMenu, toggleOn, toggleOff] = useShowMenu({ setSearchQuery });
  const location = useLocation();

  useEffect(() => {
    setSearchQuery(""); //clear search on nav
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const handleChange = (e) => {
    const val = e.target.value;
    toggleOn(e);
    setSearchQuery(val);
  };

  useEffect(() => {
    setLoading(true);
    if (searchQuery.length > 0) {
      socket.emit("search", searchQuery);
    }
    socket.on("result", (res) => {
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
        <Link className="logoInner" to={"/home"}>
          {" "}
          <div>LOGO</div>
        </Link>
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
          {searchQuery.length > 0 && showMenu && (
            <SearchBox loading={loading} results={searchRes} />
          )}
        </div>
      )}{" "}
      {token && (
        <div className="functionWrap">
          <Link to={`user/${user._id}`}>
            <i class="ri-user-line"></i>
          </Link>

          <i onClick={logout} class="ri-logout-circle-line"></i>
        </div>
      )}
    </div>
  );
};

export default Header;
