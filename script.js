const apiKey = 'patElzckNGBWBoxdu.60f140f462fabcd2312e47f5ad08a73644bd9a5c1bd76659c7533adce0182699';
const baseId = 'app05mIKwNPO2l1vT';
const tableName = 'Boba - YSWS';

const eventCodeFieldId = 'fldJE64wXx0NtfFJY';   
const gitHubURLFieldId = 'fldiQTbHOJ4Smo2Cx';   
const statusFieldId = 'fldjRo5emakYHTKnY';       
const nameFieldId = 'fldeAMpKMvhiFAokN';         


const ADMIN_PASSWORD = "boba2024";

async function getWebsitesByEventCode(eventCode) {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={${eventCodeFieldId}}="${eventCode}"`;
    try {
      const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json' 
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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

async function getAllWebsites() {
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.records.length > 0) {
            return data.records.map(record => ({
                eventCode: record.fields[eventCodeFieldId] || 'N/A',
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

async function updateConnectionStatus() {
    const connectionStatus = document.getElementById('connection-status');
    try {
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        if (response.ok) {
            connectionStatus.style.backgroundColor = 'green'; // Change to green if connected
        }
    } catch (error) {
        console.error('Connection error:', error);
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
                <strong>Name:</strong> ${website.name}
                <br>
                <a href="${website.gitHubURL}" target="_blank">${website.gitHubURL}</a>
                <br>
                <strong>Status:</strong> ${website.status}
            `;
            websiteList.appendChild(listItem);
        });
    } else {
        websiteList.innerHTML = '<li>No websites found for this event code.</li>';
    }
});

// Admin stuff
document.getElementById('loginAdmin').addEventListener('click', () => {
    const password = document.getElementById('admin-password').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
    } else {
        document.getElementById('login-error').textContent = 'Incorrect password. Please try again.';
    }
});

// get websites
document.getElementById('fetchAll').addEventListener('click', async () => {
    const websites = await getAllWebsites();
    const adminStatusList = document.getElementById('adminStatus');
    adminStatusList.innerHTML = '';

    if (websites.length > 0) {
        websites.forEach(website => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Event Code:</strong> ${website.eventCode}
                <br>
                <strong>Name:</strong> ${website.name}
                <br>
                <a href="${website.gitHubURL}" target="_blank">${website.gitHubURL}</a>
                <br>
                <strong>Status:</strong> ${website.status}
            `;
            adminStatusList.appendChild(listItem);
        });
    } else {
        adminStatusList.innerHTML = '<li>No websites found.</li>';
    }
});

// statys
window.onload = updateConnectionStatus;

async function getToken() {
    try {
        const response = await fetch('/test-token');
        const data = await response.json();
        console.log('Token from backend:', data.token);
    } catch (error) {
        console.error('Error fetching token:', error);
    }
}


getToken();

