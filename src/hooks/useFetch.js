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
        console.log("err");
        setLoading(false);
        //cb.401 ? cb.401() :
        nav(`/unauthorised`, { replace: true });
        // and so on
        //TODO
        return;
      }
      if (data.status === 400) {
        console.log("err");
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
        console.log("err");
        throw new Error("Could not fetch the resource");
      }
      const jsonData = await data.json();
      setLoading(false);
      return jsonData;
    } catch (e) {
      setError(true);
      console.log(e);
      console.log("error fetching caught");
      //cb ? cb() : nav oops
      setLoading(false);
      return;
    }
  };
  return [fetchData, loading, error];
};

export default useFetch;
