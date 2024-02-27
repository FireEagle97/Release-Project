const CsvReadableStream = require('csv-reader');
const {getImageUrls} = require('./image-store');
const fs = require('fs');
// for images, every lease gets 2 from interior and 3 from extras

async function getAllLeases(filePath = '../data/House_Rent_Dataset.csv') {
    try {
        // retrived images' url from blob storage
        // images from interior and extras, each lease has 2 interior and 2 extras
        const {interior, extras} = await getImageUrls();
        
        const data = await readCsvFile(filePath);

        const arrangedData = reArrangeData(data, interior, extras);

        return arrangedData;
    } catch (error) {
        console.error('Error in fetching data for seed:', error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function reArrangeData(data, interior, extras) {
    // randomize images
    shuffleArray(interior); 
    shuffleArray(extras); 

    let interiorIndex = 0;
    let extrasIndex = 0;

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const newImageUrls = [];

        // Add two URLs from interior
        for (let j = 0; j < 2; j++) {
            if (interiorIndex >= interior.length) {
                interiorIndex = 0;
                shuffleArray(interior); 
            }
            newImageUrls.push(interior[interiorIndex]);
            interiorIndex++;
        }

        // Add two URLs from extras
        for (let j = 0; j < 2; j++) {
            if (extrasIndex >= extras.length) {
               
                extrasIndex = 0;
                shuffleArray(extras); 
            }
            newImageUrls.push(extras[extrasIndex]);
            extrasIndex++;
        }

        // Update the image field in the item object
        item.images = newImageUrls;
    }

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
                        'pointOfContact': row[11],
                        'images': null,
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