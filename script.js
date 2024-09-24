const apiKey = 'pat84MLj08BHlZkVu.3971198ea6ee84cd5bf55710e507afa0a273d20c5c0e3c1724b4f4d01c285966';
const baseId = 'app05mIKwNPO2l1vT';
const tableName = 'Boba - YSWS';

// Function to fetch websites from Airtable based on the event code
async function getWebsitesByEventCode(eventCode) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={Event%20Code}="${eventCode}"`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const data = await response.json();

        if (data.records.length > 0) {
            return data.records.map(record => record.fields['GitHub Pages URL']); // Adjust 'GitHub Pages URL' to your field name if needed
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching data from Airtable:', error);
        return [];
    }
}

// Event listener for the button click
document.getElementById('getWebsites').addEventListener('click', async () => {
    // Get the value from the text box
    const eventCode = document.getElementById('Event Code').value; // Make sure the input field ID matches

    // Fetch websites for the entered event code
    const websites = await getWebsitesByEventCode(eventCode);

    // Display the websites
    const websiteList = document.getElementById('Status'); // Make sure this ID exists in your HTML
    websiteList.innerHTML = '';

    if (websites.length > 0) {
        websites.forEach(website => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${website}" target="_blank">${website}</a>`;
            websiteList.appendChild(listItem);
        });
    } else {
        websiteList.innerHTML = '<li>No websites found for this event code.</li>';
    }
});
