import { useEffect, useState } from "react";
import useFetch from "./useFetch";
//pass skip in and use in place of number
const usePaginate = (url, options, cb) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchData, fetchInProgress, error] = useFetch();
  const [reachedEnd, setReachedEnd] = useState(false);

  const addOne = (newObj) => {
    setData((prev) => {
      return [newObj, ...prev];
    });
  };

  const refresh = () => {
    setLoading(true);
  };

  const reset = () => {
    setData([]);
    setReachedEnd(false);
    refresh();
  };

  useEffect(() => {
    const startLoad = async () => {
      const jsonData = await fetchData(url, options);
      console.log(jsonData);
      setData((prev) => {
        return [...prev, ...jsonData];
      });
      if (jsonData.length < 5) {
        setReachedEnd(true);
      } else {
        cb((prev) => {
          return prev + 5; //skip here
        });
      }
      setLoading(false);
    };

    if (loading && !fetchInProgress && !reachedEnd) {
      startLoad();
    }
  }, [cb, fetchData, fetchInProgress, loading, options, reachedEnd, url]);

  return [data, refresh, loading, reachedEnd, reset, addOne];
};

export default usePaginate;
