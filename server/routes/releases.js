const express = require('express');
const router = express.Router();
const {DB} = require('./db.db');
const db = DB();

router.get('/', async (req, res) => {
    try{
        const data =  await db.getAllReleases();
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});

//rent, size, furnishing

router.get('/:city', async (req, res) => {
    try{
        const city = req.params.city
        const area = req.query.area
        const rent = req.query.rent;
        const size = req.query.size;
        const furnishing = req.query.furnishing;
        const data = await getReleasesByCityAndFilters(city, area, { rent, size, furnishing });
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});


module.exports = {
    releasesRouter: router
};