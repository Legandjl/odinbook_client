import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./header.css";
import SearchBox from "./SearchBox";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { socket } = useContext(SocketContext);

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
      <div className={"searchWrap"}>
        <input
          placeholder="Find a user"
          className="searchBox"
          type={"text"}
          value={searchQuery}
          onChange={handleChange}
        />
        {searchQuery.length > 0 && <SearchBox loading={loading} />}
      </div>
    </div>
  );
};

export default Header;
