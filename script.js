const apiKey = 'your_airtable_api_key';
const baseId = 'your_airtable_base_id';
const tableName = 'your_table_name';

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
