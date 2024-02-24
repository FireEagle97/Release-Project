const CsvReadableStream = require('csv-reader');
const fs = require('fs');

// for images, every lease gets 2 from interior and 3 from extras

async function getAllLeases(filePath = 'data/House_Rent_Dataset_2.csv') {
    const data = await readCsvFile(filePath);
    return data;
}
async function readCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        const inputStream = fs.createReadStream(filePath, 'utf8');
        let isFirstRow = true;

        inputStream.
            pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })).
            on('data', (row) => {
                if (isFirstRow) {
                    isFirstRow = false;
                } else {
                    const customizedObject = {
                        'postedDate': row[0], 
                        'bhk': row[1],
                        'rentPrice': row[2],
                        'size': row[3],
                        'floor': row[4],
                        'areaType': row[5],
                        'areaLocality': row[6],
                        'city': row[7],
                        'furnishing': row[8],
                        'preferredTentant': row[9],
                        'bathroom': row[10],
                        'pointOfContact': row[11]
                    };
                    results.push(customizedObject);
                }
            }).
            on('end', () => {
                resolve(results);
            }).
            on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = {getAllLeases};