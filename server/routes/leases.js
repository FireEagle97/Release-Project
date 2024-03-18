const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.get('/', async (req, res) => {
    try{
        const db = new DB();
        const data =  await db.getAllLeases();
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});

//rent, size, furnishing

router.get('/:city', async (req, res) => {
    try{
        const db = new DB();
        const city = req.params.city;
        const area = req.query.area;
        const bathrooms = req.query.bathroom;
        const bedrooms = req.query.bedroom;
        const minRent = req.query['rentMinimum'];
        const maxRent = req.query['rentMaximum']; 
        const rent = {'minimum': minRent, 'maximum': maxRent}; 
        const minSize = req.query['sizeMinimum'];
        const maxSize = req.query['sizeMaximum']; 
        const size = {'minimum': minSize, 'maximum': maxSize}; 
        const furnishing = req.query.furnishing;
        const data = await db.getLeasesByCityAndFilters(city, area, { rent, size,
            furnishing, bathrooms, bedrooms });
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});


module.exports = {
    leasesRouter: router
};
