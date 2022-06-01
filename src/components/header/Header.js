import { useState } from "react";
import "./header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
  };
  return (
    <div className="header">
      <div className="logo">
        <div className="logoInner">LOGO</div>
      </div>
      <div className="searchWrap">
        <input
          placeholder="Find a user"
          className="searchBox"
          type={"text"}
          value={searchQuery}
          onChange={handleChange}
        />
        {searchQuery.length > 0 && <div className={"searchRes"}></div>}
      </div>
    </div>
  );
};

export default Header;
