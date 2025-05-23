const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;


// Serve static files from the public directory under /public
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/api/images', async (req, res)=>{
    try {
        const imagesPath = path.join(__dirname, 'Public', 'images');
        const files = await fs.promises.readdir(imagesPath);
        
        // Filter out .gitkeep and create full URLs
        const imageUrls = files
            .filter(file => file !== '.gitkeep')
            .map(file => `http://localhost:${PORT}/Public/images/${file}`);
        
        res.json({
            isSuccess: true,
            message: "All images fetched",
            data: imageUrls
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: "Error reading image directory",
            data: []
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});