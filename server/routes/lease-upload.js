const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');
const debug = require('debug');
const logger = debug('server:posting listing');
const azureConnection = process.env.AZURE_CONNECTION;
const azureContainerName = process.env.AZURE_CONTAINER_NAME;
const { BlobServiceClient} = require('@azure/storage-blob');

// to do
// erase title, make city and arealocality and preferredtentant, in client
router.post('/', async (req, res) => {
    const property = req.body;

    // validate property
    if (!validateProperty(property)) {
        return res.status(400).json({ error: 
            'Validation failed. Please provide valid property details.' });
    }

    // to do
    // not validated the req.files has files
    const imageUrls = await getImageUrls(req.files);

    const postedDate = getCurrentDate();
    const leaseObject = {
        'postedDate': postedDate, 
        'bhk': property.bedrooms,
        'rentPrice': property.rentPrice,
        'size': property.size,
        'floor': property.floorNumber,
        'areaLocality': 'nothing yet',
        'city': 'nothing yet',
        'furnishing': property.furnishing,
        'preferredTentant': 'nothing yet',
        'bathroom': property.bathrooms,
        'pointOfContact': property.contactInfo,
        'description': property.description,
        'address': property.address,
        'images': imageUrls
    };

    const db = new DB();
    await db.createManyLeases([leaseObject]);
    logger('data seeded', leaseObject);
    res.status(200).send({'respose':'ok'});

});

async function getImageUrls(files){
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const containerClient = blobService.getContainerClient(azureContainerName);

    const uploadPromises = [];
    // store file names in blobclient and retrieve urls
    for (const [, file] of Object.entries(files)) {
        if (file) {
            const blobClient = containerClient.getBlockBlobClient(file.name);
            const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
            const uploadPromise = blobClient.uploadData(file.data, options);
            uploadPromises.push(uploadPromise);
        }
    }
    // for avoiding await in loop
    await Promise.all(uploadPromises);

    const imageUrls = Object.values(files).filter(file => file).map(file => {
        const blobClient = containerClient.getBlockBlobClient(file.name);
        return blobClient.url;
    });

    return imageUrls;
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Month is zero-based, so add 1 to get the current month
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


// Validation function
function validateProperty(property) {
    const { rentPrice, address, 
        contactInfo, size, 
        bedrooms, bathrooms, floorNumber, furnishing } = property;
    // Check if all required fields are present and non-empty
    if (!rentPrice || !address 
        || !contactInfo 
        || !size || !bedrooms || !bathrooms || !floorNumber || !furnishing) {
        return false;
    }
    // Check if rentPrice, size, bedrooms, bathrooms, and floorNumber are numbers
    if (isNaN(rentPrice) || isNaN(size) 
    || isNaN(bedrooms) || isNaN(bathrooms) || isNaN(floorNumber)) {
        return false;
    }
    return true;
}

module.exports = {
    leaseUploadRouter: router
};
