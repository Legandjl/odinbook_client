import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const usePaginate = (url, options, cb) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [fetchData, fetchInProgress, error] = useFetch();
  const [reachedEnd, setReachedEnd] = useState(false);

  const refresh = () => {
    setLoading(true);
  };

  const reset = () => {
    setData([]);
    refresh();
  };

  useEffect(() => {
    const startLoad = async () => {
      const jsonData = await fetchData(url, options);
      setData((prev) => {
        return [...prev, ...jsonData];
      });
      if (jsonData.length < 1) {
        setReachedEnd(true);
      } else {
        cb((prev) => {
          return prev + 1;
        });
      }
      setLoading(false);
    };

    if (loading && !fetchInProgress && !reachedEnd) {
      startLoad();
    }
  }, [cb, fetchData, fetchInProgress, loading, options, reachedEnd, url]);

  return [data, refresh, loading, reachedEnd];
};

export default usePaginate;
