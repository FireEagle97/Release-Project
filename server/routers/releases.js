const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const data =  await getAllReleases();
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});

//rent, size, furnishing

router.get('/:city?area', async (req, res) => {
    try{
        const city = req.params.city
        const area = req.query.area
        const data =  await getReleasesByArea(city, area);
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});


module.exports = {
    releases: router
};