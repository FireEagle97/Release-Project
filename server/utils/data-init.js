const CsvReadableStream = require('csv-reader');
const {getImageUrls} = require('./image-store');
const fs = require('fs');
const {getRandomCityLocalityPair, getRandomPrice, getRandomDate} = require('./utils');
// for images, every lease gets 2 from interior and 3 from extras

async function getAllLeases(filePath = 'data/House_Rent_Dataset.csv') {
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
                    // posted date is randomized from 2024 dates till now
                    const randomPostedDate = getRandomDate();
                    const randomCityLocalityPair = getRandomCityLocalityPair();
                    const randomPrice = getRandomPrice(row[1]);
                    const customizedObject = {
                        'postedDate': randomPostedDate, 
                        'bhk': row[1],
                        'rentPrice': randomPrice,
                        'size': row[3],
                        'floor': row[4],
                        'areaLocality': randomCityLocalityPair.areaLocality,
                        'city': randomCityLocalityPair.city,
                        'furnishing': row[8],
                        'preferredTentant': row[9],
                        'bathroom': row[10],
                        'pointOfContact': row[11],
                        'description': null,
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