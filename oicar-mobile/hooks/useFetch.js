import { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () => {
      setIsPending(true);

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!signal.aborted && !result.msg) {
          setData(result);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setIsPending(false);
        }
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
