const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');
const debug = require('debug');
const logger = debug('server:posting listing');
const {getImageUrls} = require('./utils/image-upload');
const {getCurrentDate, validateProperty} = require('./utils/lease-upload-utils');
// to do
// erase title, make city and arealocality and preferredtentant, in client
router.post('/', async (req, res) => {
    const property = req.body;

    // validate property
    if (!validateProperty(property)) {
        return res.status(400).json({ error: 
            'Validation failed. Please provide valid property details.' });
    }
    try{
        const imageUrls = await getImageUrls(req.files);

        const postedDate = getCurrentDate();
        const leaseObject = {
            'postedDate': postedDate, 
            'bhk': property.bedrooms,
            'rentPrice': property.rentPrice,
            'size': property.size,
            'floor': property.floorNumber,
            'address': property.address,
            'city': property.city,
            'furnishing': property.furnishing,
            'preferredTentant': property.preferredTentant,
            'bathroom': property.bathrooms,
            'pointOfContact': property.contactInfo,
            'description': property.description,
            'images': imageUrls
        };

        const db = new DB();
        await db.createManyLeases([leaseObject]);
        logger('data seeded', leaseObject);
        res.status(200).send({'respose':leaseObject});
    }catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = {
    leaseUploadRouter: router
};
