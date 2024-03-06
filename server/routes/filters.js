const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.get('/allcities', async (req, res) => {
    try{
        const db = new DB();
        const data =  await db.getAllCities();
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});
module.exports = {
    filtersRouter: router
};
