import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const { login, token, loading } = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    if (token && !loading) {
      const path = localStorage.getItem("path");
      if (
        !path ||
        path === "/login" ||
        path === "/oops" ||
        path === "/404" ||
        path === "/oops" ||
        path === "/unauthorised"
      ) {
        nav(`/home`, { replace: true });
      } else {
        nav(path, { replace: true });
      }
    }
  }, [loading, nav, token]);
  return (
    <div className="loginWrap">
      {!token && <button onClick={login}>click me</button>}
    </div>
  );
};
export default Login;
