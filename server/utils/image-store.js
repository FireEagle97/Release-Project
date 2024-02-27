const fs = require('fs');
const azureConnection = process.env.AZURE_CONNECTION;
const azureContainerName = process.env.AZURE_CONTAINER_NAME;
const { BlobServiceClient} = require('@azure/storage-blob');


async function getImageUrls() {
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const containerClient = blobService.getContainerClient(azureContainerName);

    const interiorUrls = [];
    const extrasUrls = []; 
    const interiorFolderPath = '../data/images/interior';
    const extrasFolderPath = '../data/images/extras';
    
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

module.exports = {getImageUrls};