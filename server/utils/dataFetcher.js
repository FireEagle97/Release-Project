const fs = require('fs');
const csv = require('csv-parser');

/**
 * Reads and parses a CSV file containing rental data.
 * @param {string} filePath - The path to the CSV file to be read and parsed.
 * @returns {Promise<Array<Object>>} 
 * A promise that resolves with an array of objects, each representing a row in the CSV file.
 * @throws {Error} If there is an error reading or parsing the CSV file.
 */
function readAndParseCSVRents(filePath) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath).
            pipe(csv()).
            on('data', (row) => {
                data.push(row); 
            }).
            on('end', () => {
                resolve(data); 
            }).
            on('error', (error) => {
                // eslint-disable-next-line no-console
                console.log(error);
                reject(error); 
            });
    });
}
  
module.exports = {readAndParseCSVRents};