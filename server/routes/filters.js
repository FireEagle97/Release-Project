const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');

router.get('/:filter', async (req, res) => {
    try{
        const db = new DB();
        const filter = req.params.filter;
        const data =  await db.getAllFilterList(filter);
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});
router.get('/setFilters', async(req, res) => {
    const body = req.body;
    // const filterObject = {
    //     'rentPrice': body.rent,
    //     'city': body.city,
    //     'furishing' : body.furnishing,
    //     'bathroom':body.bathroom
    // };
    const filterObject = {
        'city': body.city,
    };
    const db = new DB();
    const filteredData = await db.getLeasesByFilters(filterObject);
    res.json({'response':filteredData});

});
module.exports = {
    filtersRouter: router
};
