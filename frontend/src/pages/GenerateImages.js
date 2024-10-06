import React, { useState } from 'react';

const GenerateImages = () => {
    const [csvFiles, setCsvFiles] = useState([]);
    const [message, setMessage] = useState('');

    const handleFolderChange = (event) => {
        const files = event.target.files; // Get all files
        const csvFilesArray = Array.from(files).filter(file => file.name.endsWith('.csv')); // Filter for .csv files
        setCsvFiles(csvFilesArray); // Update state with the filtered CSV files
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (csvFiles.length === 0) {
            setMessage('Please select a folder containing .csv files.');
            return;
        }

        // Get the path of the first CSV file (you might want to handle multiple CSVs differently)
        const inputDirectory = csvFiles[0].webkitRelativePath.split('/')[0]; // Get the folder path

        try {
            const response = await fetch('http://localhost:4000/api/generate-images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputDirectory }),
            });

            const data = await response.json();
            setMessage(data.message || 'Images generated successfully.');
        } catch (error) {
            console.error('Error generating images:', error);
            setMessage('Error generating images.');
        }
    };

    return (
        <div>
            <h1>Generate Images</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    webkitdirectory="true" 
                    directory="true" 
                    onChange={handleFolderChange} 
                />
                <button type="submit">Generate Images</button>
            </form>
            {csvFiles.length > 0 && (
                <ul>
                    {csvFiles.map((file, index) => (
                        <li key={index}>{file.name}</li> // Displaying names of the CSV files
                    ))}
                </ul>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default GenerateImages;
