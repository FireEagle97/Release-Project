const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.get('/:userID', async (req, res) => {
    try{
        const db = new DB();
        const data =  await db.getUserLeases();
        res.json({'response':data});
      
    }catch(err){
        res.status(404).send({'error': 'User not found'});
      
    }
});

module.exports = {
    userLeaseDelete: router
};