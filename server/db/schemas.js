/* eslint-disable camelcase */
// Requiring module 
const mongoose = require('mongoose'); 

// Release Schema
const leaseSchema = new mongoose.Schema({
    postedDate: String, 
    bhk: Number,
    rentPrice: Number,
    size: Number,
    floor: String,
    areaLocality: String,
    city: String,
    furnishing: String,
    preferredTentant: String,
    bathroom: Number,
    pointOfContact: String,
    description: String,
    address: String,
    images: Array,
}); 

const lease = mongoose.model('lease', leaseSchema); 

// Exporting our model objects 
module.exports = { 
    leases : lease
};