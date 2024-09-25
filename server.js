require('dotenv').config();  

const express = require('express');
const app = express();
const port = 3000;


    const apiKey = process.env.AIRTABLE_API_KEY;
    res.json({ token: apiKey });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
