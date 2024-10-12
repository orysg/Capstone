import React, { useState } from 'react';

const GenerateImages = () => {
    const [csvFiles, setCsvFiles] = useState([]);
    const [message, setMessage] = useState('');
    const [generatedImages, setGeneratedImages] = useState([]);

    const handleFolderChange = (event) => {
        const files = event.target.files;
        const csvFilesArray = Array.from(files).filter(file => file.name.endsWith('.csv'));
        setCsvFiles(csvFilesArray);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (csvFiles.length === 0) {
            setMessage('Please select a folder containing .csv files.');
            return;
        }

        // Prepare form data
        const formData = new FormData();
        csvFiles.forEach((file) => {
            formData.append('csvFiles', file);
        });

        try {
            const response = await fetch('http://localhost:4000/api/generate-images', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setMessage(data.message);
            setGeneratedImages(data.images || []); // Set the generated images paths
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
                    multiple 
                    onChange={handleFolderChange} 
                />
                <button type="submit">Generate Images</button>
            </form>

            {message && <p>{message}</p>}

            {generatedImages.length > 0 && (
                <div>
                    <h2>Generated Images:</h2>
                    {generatedImages.map((imagePath, index) => (
                        <img key={index} src={`http://localhost:4000${imagePath}`} alt={`Generated ${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenerateImages;
