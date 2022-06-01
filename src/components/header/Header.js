import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="logoInner">LOGO</div>
      </div>
      <input placeholder="Find a user" className="searchBox" type={"text"} />
    </div>
  );
};

export default Header;
