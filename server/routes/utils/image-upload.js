const azureConnection = process.env.AZURE_CONNECTION;
const azureContainerName = process.env.AZURE_CONTAINER_NAME;
const { BlobServiceClient} = require('@azure/storage-blob');

async function getImageUrls(files){
    if (!files || Object.keys(files).length === 0) {
        return [];
    }
    console.log(azureConnection);
    console.log(azureContainerName);

    let blobService;
    try {
        blobService = BlobServiceClient.fromConnectionString(azureConnection);
    } catch (error) {
        console.error('Failed to create BlobServiceClient:', error);
        return []; 
    }

    const containerClient = blobService.getContainerClient(azureContainerName);

    const uploadPromises = [];
    for (const [, file] of Object.entries(files)) {
        if (file) {
            try {
                const blobClient = containerClient.getBlockBlobClient(file.name);
                const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
                const uploadPromise = blobClient.uploadData(file.data, options).catch(e => {
                    console.error(`Failed to upload file ${file.name}:`, e);
                    return null;
                });
                uploadPromises.push(uploadPromise);
            } catch (error) {
                console.error(`Error processing file ${file.name}:`, error);
                // Continue processing other files even if one fails
            }
        }
    }

    // For avoiding await in loop
    const results = await Promise.all(uploadPromises);

    const imageUrls = results.filter(result => result !== null).map((_, index) => {
        const file = Object.values(files).filter(file => file)[index];
        const blobClient = containerClient.getBlockBlobClient(file.name);
        return blobClient.url;
    });
    // const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    // const containerClient = blobService.getContainerClient(azureContainerName);

    // const uploadPromises = [];
    // // store file names in blobclient and retrieve urls
    // for (const [, file] of Object.entries(files)) {
    //     if (file) {
    //         const blobClient = containerClient.getBlockBlobClient(file.name);
    //         const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
    //         const uploadPromise = blobClient.uploadData(file.data, options);
    //         uploadPromises.push(uploadPromise);
    //     }
    // }
    // // for avoiding await in loop
    // await Promise.all(uploadPromises);

    // const imageUrls = Object.values(files).filter(file => file).map(file => {
    //     const blobClient = containerClient.getBlockBlobClient(file.name);
    //     return blobClient.url;
    // });

    return imageUrls;
}

module.exports = {getImageUrls};