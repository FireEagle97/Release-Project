const CsvReadableStream = require('csv-reader');
const fs = require('fs');
const azureConnection = process.env.AZURE_CONNECTION;
const azureContainerName = process.env.AZURE_CONTAINER_NAME;
const { BlobServiceClient} = require('@azure/storage-blob');

// for images, every lease gets 2 from interior and 3 from extras

async function getImageUrls() {
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const containerClient = blobService.getContainerClient(azureContainerName);

    const interiorUrls = [];
    const extrasUrls = []; 
    const interiorFolderPath = 'data/images/interior';
    const extrasFolderPath = 'data/images/extras';
    
    return new Promise((resolve, reject) => {
        fs.readdir(interiorFolderPath, async (err, files) => {
            if (err) {
                console.error('Error reading folder:', err);
                reject(err);
                return;
            }

            const uploadPromises = [];

            for (const file of files) {
                // Skip .DS_Store files
                if (file === '.DS_Store') {
                    continue;
                }

                const filePath = `${interiorFolderPath}/${file}`;

                const blobClient = containerClient.getBlockBlobClient(file);

                // Wrap the asynchronous operation inside a function and push it to uploadPromises
                const uploadPromise = (async () => {
                    try {
                        const fileData = fs.readFileSync(filePath);
                        const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
                        await blobClient.uploadData(fileData, options);
                        const url = blobClient.url;
                        interiorUrls.push(url);
                    } catch (error) {
                        console.error('Error uploading file:', error.message);
                    }
                })();

                uploadPromises.push(uploadPromise);
            }
            await Promise.all(uploadPromises);
        });

        fs.readdir(extrasFolderPath, async (err, files) => {
            if (err) {
                console.error('Error reading extras folder:', err);
                reject(err);
                return;
            }

            const uploadPromises = [];

            for (const file of files) {
                if (file === '.DS_Store') {
                    continue;
                }

                const filePath = `${extrasFolderPath}/${file}`;
                const blobClient = containerClient.getBlockBlobClient(file);

                const uploadPromise = (async () => {
                    try {
                        const fileData = fs.readFileSync(filePath);
                        const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
                        await blobClient.uploadData(fileData, options);
                        const url = blobClient.url;
                        extrasUrls.push(url);
                    } catch (error) {
                        console.error('Error uploading file (extras):', error.message);
                    }
                })();

                uploadPromises.push(uploadPromise);
            }
            await Promise.all(uploadPromises);
            resolve({ interior: interiorUrls, extras: extrasUrls });
        });

    });
}

async function getAllLeases(filePath = 'data/House_Rent_Dataset_2.csv') {
    try {
        const {interior, extras} = await getImageUrls();
        console.log('interior: ', interior);
        console.log('extras: ', extras);
    } catch (error) {
        console.error('Error getting image URLs:', error);
    }
    // const data = await readCsvFile(filePath);
    // return data;
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