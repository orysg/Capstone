// src/pages/GenerateImages.js

import React, { useState } from 'react';

const GenerateImages = () => {
    const [filePath, setFilePath] = useState('');
    const [message, setMessage] = useState('');

    const handleGenerateImages = () => {
        fetch('/api/generate-images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add your authorization token if needed
            },
            body: JSON.stringify({ filePath }), // Send the file path as a JSON body
        })
        .then(response => {
            if (response.ok) {
                setMessage('Images generated successfully.');
            } else {
                throw new Error('Failed to generate images.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Error generating images: ' + error.message);
        });
    };

    return (
        <div>
            <h1>Generate Images</h1>
            <input
                type="text"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                placeholder="Enter path to your CSV file"
            />
            <button onClick={handleGenerateImages}>Generate Images</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default GenerateImages;
