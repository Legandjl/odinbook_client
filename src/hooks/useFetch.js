import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  if (error) {
    console.error("error " + error);
  }
  const fetchData = async (params, options) => {
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
        console.log(data.error);
        setError(404);
        setLoading(false);
        return;
      }
      if (!data.ok) {
        throw new Error("Could not fetch the resource");
      }
      const jsonData = await data.json();
      setLoading(false);
      return jsonData;
    } catch (e) {
      setError(500);
      setLoading(false);
      return;
    }
  };
  return [fetchData, loading, error];
};

export default useFetch;
