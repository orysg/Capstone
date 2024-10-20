import fs from 'fs';
import path from 'path';
/*
// Function to fetch fall data from JSON file
const fetchFallData = () => {
    const filePath = path.join(process.cwd(), 'public', 'data', 'fallHistory.json');
    
    // Read the JSON file
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the JSON data
    const fallData = JSON.parse(jsonData);
    
    return fallData;
};

// API route handler

export async function GET(req, res) {
    try {
        const data = fetchFallData();
        
        // Send the fetched data as a JSON response
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Handle any errors
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ message: 'Error fetching fall history data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
*/