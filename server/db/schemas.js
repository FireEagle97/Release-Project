// Requiring module 
const mongoose = require('mongoose'); 

// Release Schema
const releaseSchema = new mongoose.Schema({
    posted_on: String, 
    bhk: Number,
    rent: Number,
    size: Number,
    floor: String,
    area_type: String,
    area_local: String,
    city: String,
    furnishing: String,
    bathroom: Number
}); 

const Release = mongoose.model('release', releaseSchema); 

// Exporting our model objects 
module.exports = { 
    Release
};