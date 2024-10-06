const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const router = express.Router();

// Endpoint for generating images
router.post('/generate-images', (req, res) => {
    const inputDirectory = req.body.inputDirectory;
    const scriptPath = path.join(__dirname, '../MATLABS', 'apply_generate_pic_to_datasets.m');

    exec(`matlab -batch "apply_generate_pic_to_datasets('${inputDirectory}')"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Error generating images' });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error generating images' });
        }
        console.log(`Script output: ${stdout}`);
        res.status(200).json({ message: 'Images generated successfully' });
    });
});

module.exports = router;
