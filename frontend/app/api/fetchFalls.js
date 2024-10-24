export const fetchFalls = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/falls');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching falls:', error);
      throw error;
    }
  };
  