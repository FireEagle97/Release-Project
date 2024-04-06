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


/**
 * @swagger
 * /leases/{city}:
 *   get:
 *     summary: Retrieve filtered leases.
 *     description: Displays leases filtered by city (mandatory) and other queries.
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: The city location of the leases.
 *         schema:
 *           type: string
 *       - in: path
 *         name: furnishing
 *         required: false
 *         description: The furnishing description of the apartment
 *         schema:
 *           type: string
 *       - in: path
 *         name: area
 *         required: false
 *         description: The area location inside the city of the lease.
 *         schema:
 *           type: string
 *       - in: path
 *         name: bathroom
 *         required: false
 *         description: The number of the bathrooms in the apartment.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: bedroom
 *         required: false
 *         description: The number of the bedrooms in the apartment.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: rentMinimum
 *         required: false
 *         description: The minimum rent price of the apartment.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: rentMaximum
 *         required: false
 *         description: The maximum rent price of the apartment.
 *         schema:
 *           type: integer
 *         name: sizeMinimum
 *         required: false
 *         description: The minimum size of the apartment in squarefoot.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: rentMaximum
 *         required: false
 *         description: The maximum size of the apartment in squarefoot.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list of filtered apartments.
 *         content:
 *           application/json:
 *             example:
 *               country: Estonia, Rep. of
 *               ISO3: EST
 *               year: "2000"
 *               temperature_change: "2.066"
 *             schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 year:
 *                   type: string
 *                   description: temperature change in celsius
 *                 ISO3:
 *                   type: string
 *                   description: country 3 letter code
 *                 country:
 *                   type: string
 *                   description: country name
 *                 temperature_change:
 *                   type: string
 *                   description: temperature change compared to previous year
 *       400:
 *         description: Invalid query paramater value input.
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Rent values must be non-negative integers
 *             schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: rejected
 *               message:
 *                 type: string
 *                 description: specifies invalid input
 * */

router.get('/:city', async (req, res) => {
    try{
        const db = new DB();
        const city = req.params.city;
        const area = req.query.area;
        const bathrooms = req.query.bathroom;
        const bedrooms = req.query.bedroom;
        const minRent = req.query['rentMinimum'];
        const maxRent = req.query['rentMaximum']; 
        const minSize = req.query['sizeMinimum'];
        const maxSize = req.query['sizeMaximum']; 
        const furnishing = req.query.furnishing;

        // Response validation for integer parameters (if provided)
        const size = {};
        if (minSize !== undefined && maxSize !== undefined) {
            const minSizeInt = parseInt(minSize);
            const maxSizeInt = parseInt(maxSize);
            if (isNaN(minSizeInt) || isNaN(maxSizeInt) || minSizeInt < 0 || maxSizeInt < 0) {
                throw new Error('Size values must be non-negative integers');
            }
            size.minimum = minSizeInt;
            size.maximum = maxSizeInt;
        }

        const rent = {};
        if (minRent !== undefined && maxRent !== undefined) {
            const minRentInt = parseInt(minRent);
            const maxRentInt = parseInt(maxRent);
            if (isNaN(minRentInt) || isNaN(maxRentInt) || minRentInt < 0 || maxRentInt < 0) {
                throw new Error('Rent values must be non-negative integers');
            }
            rent.minimum = minRentInt;
            rent.maximum = maxRentInt;
        }

        if (bathrooms !== undefined) {
            const bathroomsInt = parseInt(bathrooms);
            if (isNaN(bathroomsInt) || bathroomsInt < 0) {
                throw new Error('Bathrooms value must be a non-negative integer');
            }
        }

        if (bedrooms !== undefined) {
            const bedroomsInt = parseInt(bedrooms);
            if (isNaN(bedroomsInt) || bedroomsInt < 0) {
                throw new Error('Bedrooms value must be a non-negative integer');
            }
        }

        // Response validation for string parameters (if provided)
        if (typeof area !== 'undefined' && typeof area !== 'string' ||
            typeof furnishing !== 'undefined' && typeof furnishing !== 'string') {
            throw new Error('String values must be provided for optional parameters');
        }


        const data = await db.getLeasesByCityAndFilters(city, area, { rent, size,
            furnishing, bathrooms, bedrooms });
        res.json({'response':data});
      
    }catch(err){
        res.status(400).send({'error': err.message});
      
    }
});


module.exports = {
    leasesRouter: router
};
