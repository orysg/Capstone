import { useState, useEffect } from "react";
import { fetchFalls } from "../api/fetchFalls";

const useFalls = () => {
  const [falls, setFalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFalls = async () => {
      try {
        const fallsData = await fetchFalls();
        setFalls(fallsData);
        setError(null); // Reset error if fetch is successful
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    getFalls();
  }, []);

  return { falls, loading, error };
};

export default useFalls;
