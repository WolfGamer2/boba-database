const apiKey = 'pat84MLj08BHlZkVu.3971198ea6ee84cd5bf55710e507afa0a273d20c5c0e3c1724b4f4d01c285966';
const baseId = 'app05mIKwNPO2l1vT';
const tableName = 'Boba - YSWS';

const eventCodeFieldId = 'fldJE64wXx0NtfFJY';   
const gitHubURLFieldId = 'fldiQTbHOJ4Smo2Cx';   
const statusFieldId = 'fldjRo5emakYHTKnY';       
const nameFieldId = 'fldeAMpKMvhiFAokN';         

async function getWebsitesByEventCode(eventCode) {
    
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={${eventCodeFieldId}}="${eventCode}"`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const data = await response.json();

        if (data.records.length > 0) {
          
            return data.records.map(record => ({
                name: record.fields[nameFieldId],          // Name of the person.
                gitHubURL: record.fields[gitHubURLFieldId], // GitHub Pages URL.
                status: record.fields[statusFieldId],       // Status of the site.
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching data from Airtable:', error);
        return [];
    }
}


document.getElementById('getWebsites').addEventListener('click', async () => {
   
    const eventCode = document.getElementById('event-code').value; 

    
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
