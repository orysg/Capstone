import { useState, useEffect } from "react";

const useFallsCount = () => {
  const [totalFalls, setTotalFalls] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFallsCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/falls/total');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTotalFalls(Number(data.totalFalls)); 
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getFallsCount();
  }, []);

  return { totalFalls, loading, error };
};

export default useFallsCount;
