import { useState, useEffect } from "react";

const useFalls = () => {
  const [falls, setFalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFalls = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/falls');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFalls(data); // Set fetched falls data
        setError(null); // Reset error if fetch is successful
      } catch (error) {
        console.error('Error fetching falls:', error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchFalls();
  }, []); // Empty dependency array means this effect runs once after initial render

  return { falls, loading, error }; // Return state values
};

export default useFalls;
