const apiKey = 'pat84MLj08BHlZkVu.3971198ea6ee84cd5bf55710e507afa0a273d20c5c0e3c1724b4f4d01c285966';
const baseId = 'app05mIKwNPO2l1vT';
const tableName = 'Boba - YSWS';

// Replace these with the actual field IDs
const eventCodeFieldId = 'fldJE64wXx0NtfFJY';   // Field ID for "Event Code"
const gitHubURLFieldId = 'fldiQTbHOJ4Smo2Cx';   // Field ID for "GitHub Pages URL"
const statusFieldId = 'fldjRo5emakYHTKnY';         // Field ID for "Status"
const nameFieldId = 'fldeAMpKMvhiFAokN';             // Field ID for "Name"

// Function to fetch websites from Airtable based on the event code
async function getWebsitesByEventCode(eventCode) {
    // Updated URL with the Event Code Field ID
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={${eventCodeFieldId}}="${eventCode}"`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        const data = await response.json();

        if (data.records.length > 0) {
            // Map the results to include GitHub URL, Status, and Name
            return data.records.map(record => ({
                name: record.fields[nameFieldId],          // Name of the person
                gitHubURL: record.fields[gitHubURLFieldId], // GitHub Pages URL
                status: record.fields[statusFieldId],       // Status of the site
            }));
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
    const eventCode = document.getElementById('event-code').value;  // Make sure the input field ID matches

    // Fetch websites for the entered event code
    const websites = await getWebsitesByEventCode(eventCode);

    // Display the websites
    const websiteList = document.getElementById('Status');  // Make sure this ID exists in your HTML
    websiteList.innerHTML = '';

    if (websites.length > 0) {
        websites.forEach(website => {
            const listItem = document.createElement('li');
            // Display the Name, GitHub Pages URL, and Status
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
