const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.get('/:email', async (req, res) => {
    try{
        const db = new DB();
        const email = req.params.email;
        const user =  await db.findUser(email);
        res.json({'response':user});
      
    }catch(err){
        res.status(404).send({'error': 'User not found'});
      
    }
});

module.exports = {
    userProfileRouter: router
};