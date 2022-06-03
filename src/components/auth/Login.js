import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { handleLogin, token, loading } = useContext(UserContext);
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
    <div>
      <button onClick={handleLogin}>click me</button>
    </div>
  );
};
export default Login;
