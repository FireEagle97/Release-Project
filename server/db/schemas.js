// Requiring module 
const mongoose = require('mongoose'); 

// Release Schema
const appartmentSchema = new mongoose.Schema({
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

const Appartment = mongoose.model('appartment', appartmentSchema); 

// Exporting our model objects 
module.exports = { 
    Appartment
};