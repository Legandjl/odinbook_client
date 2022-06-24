import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const { login, token, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    // eslint-disable-next-line default-case
    switch (name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };
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
      <input
        name={"email"}
        type="text"
        placeholder="Email"
        onChange={handleChange}
        value={email}
      />
      <input
        name={"password"}
        type="text"
        placeholder="Password"
        onChange={handleChange}
        value={password}
      />

      {!token && (
        <button
          onClick={() => {
            login(email, password);
          }}
        >
          login
        </button>
      )}
    </div>
  );
};
export default Login;
