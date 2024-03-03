const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.post('/', async (req, res) => {
    const property = req.body;
    console.log(property);

    if (!validateProperty(property)) {
        // If validation fails, send a bad request response
        return res.status(400).json({ error: 
            'Validation failed. Please provide valid property details.' });
    }
    res.status(200).send({'respose':'ok'});

});


// Validation function
function validateProperty(property) {
    const { title, rentPrice, address, 
        contactInfo, size, 
        bedrooms, bathrooms, floorNumber, furnishing } = property;
    // Check if all required fields are present and non-empty
    if (!title || !rentPrice || !address 
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
