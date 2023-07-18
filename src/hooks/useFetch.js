import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("Loading..");
    fetchDataFromApi(url)
      .then((response) => {
        setLoading(null);
        setError(null);
        setData(response);
      })
      .catch((error) => {
        setLoading(false);
        setError("Something went wrong !!");
      });
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
