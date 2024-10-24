import { useState, useEffect } from "react";

const useRadarCount = () => {
  const [totalRadars, setTotalRadars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRadarCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/radars/count');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalRadars(Number(data.totalRadars)); // Ensure totalRadars is a number
        setError(null); // Reset error if fetch is successful
      } catch (error) {
        console.error('Error fetching radar count:', error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchRadarCount(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once after initial render

  return { totalRadars, loading, error }; // Return state values
};

export default useRadarCount;
