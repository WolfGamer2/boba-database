const apiKey = 'pat84MLj08BHlZkVu.3971198ea6ee84cd5bf55710e507afa0a273d20c5c0e3c1724b4f4d01c285966';
const baseId = '05mIKwNPO2l1vT/tblVV0tpvZnQWcsH4';
const tableName = 'Boba - YSWS';

// Airtables websites
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
            return data.records.map(record => record.fields['GitHub Pages URL']); // Website Url
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
    const eventCode = document.getElementById('Event Code').value; //Event Codes to see if website exists

    // Fetch websites for the entered event code
    const websites = await getWebsitesByEventCode(eventCode);

    // Display the websites
    const websiteList = document.getElementById('Status'); // Status of website
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
