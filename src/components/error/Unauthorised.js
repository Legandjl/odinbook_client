import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./errors.css";
const Unauthorised = () => {
  const nav = useNavigate();
  const { token, logout } = useContext(AuthContext);
  useEffect(() => {
    logout();
    setTimeout(() => {
      nav(`/login`, { replace: true });
    }, 5000);
  }, [logout, nav, token]);
  //todo cleanup link styling
  return (
    <div className="unauthorised">
      <p>Unauthorised, re-directing to login page...</p>
      <div className="loginLink">
        {" "}
        <p>If you are not automatically redirected, click </p>{" "}
        <Link to={`/login`}> here</Link>
      </div>
    </div>
  );
};

export default Unauthorised;
