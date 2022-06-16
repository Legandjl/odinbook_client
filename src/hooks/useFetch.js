import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const nav = useNavigate();
  if (error) {
    console.error("error " + error);
  }
  const fetchData = async (params, options) => {
    setError(false);
    try {
      const url = `http://localhost:3001/${params}`;
      setLoading(true);
      const data = await fetch(url, options);
      if (data.status === 401) {
        setError(401);
        setLoading(false);
        return;
      }
      if (data.status === 400) {
        setError(400);
        setLoading(false);
        return;
      }
      if (data.status === 404) {
        console.error("404 " + url);
        setLoading(false);
        //nav(`/404`, { replace: true });
        return;
      }
      if (!data.ok) {
        throw new Error("Could not fetch the resource");
      }
      const jsonData = await data.json();
      setLoading(false);
      return jsonData;
    } catch (e) {
      setError(true);
      console.log("error fetching caught");
      setLoading(false);
      return;
    }
  };
  return [fetchData, loading, error];
};

export default useFetch;
