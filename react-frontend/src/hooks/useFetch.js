import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axios.get(url, { signal: abortCont.signal });
        setData(res.data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      }
    };
    fetchData();

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, setData, isPending, error };
};

export default useFetch;
