export const fetchFallData = async () => {
    try {
        const response = await fetch("/data/fallHistory.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched fall data:", data); 
        return data; 
    } catch (error) {
        console.error("Error fetching fall data:", error);
        return []; 
    }
};
