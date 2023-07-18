// Function to fetch and display CSV data in a table with pivot results
function displayCSV() {
    // Replace 'data.csv' with the path to your CSV file on the server
    const csvFilePath = 'data.csv';

    // Fetch the CSV file
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data into an array of objects
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const tableData = rows.slice(1).map((row, index) => {
                const rowData = row.split(',');
                const rowDataObj = {
                    'S.No': rowData[0],
                    'Name': rowData[1],
                    'Email': rowData[2],
                    'Number': rowData[3]
                };
                return rowDataObj;
            });

            // Calculate the number of users (S.No)
            const numberOfUsers = tableData.length;

            // Count duplicate email IDs
            const emailCounts = {};
            tableData.forEach(row => {
                const email = row['Email'];
                if (email !== undefined) {
                    emailCounts[email] = (emailCounts[email] || 0) + 1;
                }
            });

            // Build the HTML table
            const table = document.getElementById('csvTable');
            table.innerHTML = '';

            // Create table header (assuming the first row of the CSV contains headers)
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            // Create table rows
            tableData.forEach(row => {
                const rowData = Object.values(row);
                const tableRow = document.createElement('tr');
                rowData.forEach(cellData => {
                    const cell = document.createElement('td');
                    cell.textContent = cellData;
                    tableRow.appendChild(cell);
                });
                table.appendChild(tableRow);
            });

            // Display pivot results
            const pivotResultRow = document.createElement('tr');
            const pivotResultCell = document.createElement('td');
            pivotResultCell.setAttribute('colspan', headers.length);
            pivotResultCell.innerHTML = `
                <strong>No Of Users :</strong> ${numberOfUsers}<br>
                <strong>Checking Duplication of emails:</strong><br>
            `;

            for (const email in emailCounts) {
                pivotResultCell.innerHTML += `${email}: ${emailCounts[email]}<br>`;
            }

            pivotResultRow.appendChild(pivotResultCell);
            table.appendChild(pivotResultRow);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
}

// Call the function to display the CSV data with pivot results when the page loads
window.onload = displayCSV;
