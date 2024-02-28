const express = require('express');
const router = express.Router();
const {DB} = require('../db/db');
const {postLease} = require('../controllers/leases');

router.get('/leases', async (req, res) => {
    try{
        const db = new DB();
        const data =  await db.getAllLeases();
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error':'not supported in api ' + err});
      
    }
});

//rent, size, furnishing

// router.get('/:city', async (req, res) => {
//     try{
//         const db = new DB();
//         const city = req.params.city;
//         const area = req.query.area;
//         const rent = req.query.rent;
//         const size = req.query.size;
//         const furnishing = req.query.furnishing;
//         const data = await db.getLeasesByCityAndFilters(city, area, { rent, size, furnishing });
//         res.json({'response':data});
      
//     }catch(err){
//         res.status(400).send({'error':'not supported in api ' + err});
      
//     }
// });


router.post('/leaseUpload', postLease);


module.exports = {
    leasesRouter: router
};
