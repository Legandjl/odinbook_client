import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useDataLoad = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchData, fetchInProgress, error] = useFetch();

  const refresh = () => {
    setLoading(true);
  };

  useEffect(() => {
    const startLoad = async () => {
      const jsonData = await fetchData(url, options);
      setData(jsonData);
      setLoading(false);
    };

    if (loading && !fetchInProgress) {
      startLoad();
    }
  }, [fetchData, fetchInProgress, loading, options, url]);

  return [data, refresh, loading, error];
};

export default useDataLoad;
