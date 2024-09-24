const express = require('express');
const app = express();

let approvedWebsites = [];  // In-memory storage for demo purposes

app.use(express.json());

// POST endpoint to receive approved websites from Airtable
app.post('/api/post-url', (req, res) => {
    const { url, eventCode } = req.body;

    // Store the approved website with its event code
    approvedWebsites.push({ url, eventCode });

    res.status(200).send('Website received and stored.');
});

// GET endpoint to filter websites by event code
app.get('/api/get-websites/:eventCode', (req, res) => {
    const eventCode = req.params.eventCode;
    const filteredWebsites = approvedWebsites.filter(site => site.eventCode === eventCode);

    res.status(200).json(filteredWebsites);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
