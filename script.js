const apiKey = 'pat84MLj08BHlZkVu.87f94a21eafef0884ffa0e4ba1c822e4744fd35687c9bd71202f1b9038d5e705';
const baseId = 'app05mIKwNPO2l1vT';
const tableName = 'Boba - YSWS';

const eventCodeFieldId = 'fldJE64wXx0NtfFJY';   
const gitHubURLFieldId = 'fldiQTbHOJ4Smo2Cx';   
const statusFieldId = 'fldjRo5emakYHTKnY';       
const nameFieldId = 'fldeAMpKMvhiFAokN';         

// get web from Airtable based on the event code
async function getWebsitesByEventCode(eventCode) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={${eventCodeFieldId}}="${eventCode}"`;

    console.log('Fetching URL:', url); 

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.records.length > 0) {
            return data.records.map(record => ({
                name: record.fields[nameFieldId] || 'N/A',
                gitHubURL: record.fields[gitHubURLFieldId] || 'N/A',
                status: record.fields[statusFieldId] || 'N/A',
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}


document.getElementById('getWebsites').addEventListener('click', async () => {
    
    const eventCode = document.getElementById('event-code').value; 

    // get da websites from airtable
    const websites = await getWebsitesByEventCode(eventCode);

    
    const websiteList = document.getElementById('Status'); 
    websiteList.innerHTML = '';

    if (websites.length > 0) {
        websites.forEach(website => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Name:</strong> ${website.name || 'N/A'}
                <br>
                <a href="${website.gitHubURL}" target="_blank">${website.gitHubURL}</a>
                <br>
                <strong>Status:</strong> ${website.status || 'N/A'}
            `;
            websiteList.appendChild(listItem);
        });
    } else {
        websiteList.innerHTML = '<li>No websites found for this event code.</li>';
    }
});
