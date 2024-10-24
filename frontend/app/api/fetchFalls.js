export const fetchFalls = async () => {
    try {
      let response = await fetch('http://localhost:4000/api/falls');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching falls:', error);
      throw error;
    }
  };
  