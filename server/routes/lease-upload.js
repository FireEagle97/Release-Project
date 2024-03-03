const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.post('/', async (req, res) => {
    console.log(req.body);
    res.status(200).send({'ok'});

});



module.exports = {
    leaseUploadRouter: router
};
