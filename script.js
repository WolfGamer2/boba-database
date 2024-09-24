const apiKey = 'pat84MLj08BHlZkVu.3971198ea6ee84cd5bf55710e507afa0a273d20c5c0e3c1724b4f4d01c285966';
const baseId = 'app05mIKwNPO2l1vT';
const tableName = 'Boba - YSWS';

// Function to fetch data from Airtable
async function getWebsitesByEventCode(eventCode) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={EventCode}='${eventCode}'&api_key=${apiKey}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const data = await response.json();
        
        if (data.records.length > 0) {
            return data.records.map(record => record.fields.Website); // Assuming "Website" is the field name
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching data from Airtable:', error);
        return [];
    }
}

// Example usage: Display websites for a specific event code
document.getElementById('getWebsites').addEventListener('click', async () => {
    const eventCode = document.getElementById('eventCode').value;
    const websites = await getWebsitesByEventCode(eventCode);

    const websiteList = document.getElementById('website-list');
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
