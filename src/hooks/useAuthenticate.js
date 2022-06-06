const useAuthenticate = ({ setLoading, setToken, setUser }) => {
  const setLocal = (name, data) => {
    localStorage.setItem(name, data);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: "testemail@gmail.com",
          password: "9114",
        }),
      });
      const jsonData = await data.json();
      setLocal("token", jsonData.token);
      setUser(jsonData.user);
      setToken(jsonData.token);
      setLoading(false);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    setToken(null);
    setLocal("token", "");
    setLocal("path", "");
  };
  return [login, logout];
};

export default useAuthenticate;
