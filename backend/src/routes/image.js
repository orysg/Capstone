const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary directory for uploaded files

// Endpoint for generating images
router.post('/generate-images', upload.array('csvFiles'), (req, res) => {
    const inputDirectory = path.dirname(req.files[0].path); // Get the path of the uploaded CSV file

    // Path to your MATLAB script
    const scriptPath = path.join(__dirname, '../MATLABS', 'apply_generate_pic_to_datasets.m');

    // Execute the MATLAB script
    exec(`matlab -batch "addpath('${path.join(__dirname, '../MATLABS')}'); apply_generate_pic_to_datasets('${inputDirectory}')"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Error generating images' });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error generating images' });
        }

        console.log(`Script output: ${stdout}`);

        // Assuming your generated images are stored in a specific directory, update this accordingly
        const generatedImages = ['/path/to/generated/image1.png', '/path/to/generated/image2.png']; // Example paths

        res.status(200).json({ message: 'Images generated successfully', images: generatedImages });
    });
});

module.exports = router;
