const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

// erase title, make city and arealocality and preferredtentant,
router.post('/', async (req, res) => {
    const property = req.body;
    console.log(property);

    // validate property
    if (!validateProperty(property)) {
        return res.status(400).json({ error: 
            'Validation failed. Please provide valid property details.' });
    }
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
        'address': property.address
    };
    res.status(200).send({'respose':'ok'});

});

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
