/* eslint-disable no-console */
require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const mongoose = require('mongoose');
const { Appartment } = require('./schemas');

let instance;

/**
 * Represents a MongoDB database connection.
 */
class DB{
    
    constructor() {
        if (!instance) {
            instance = this;
            this.db = null;
        }
        return instance;
    }

    async connect() {
        if (instance.db) {
            return;
        }
        await mongoose.connect(dbUrl);
        instance.db = mongoose.connection;
        instance.db.on('error', console.error.bind(console, 'connection error:'));
        instance.db.once('open', function () {
            // eslint-disable-next-line no-console
            console.log('Successfully connected to MongoDB database ');
        });
    }

    async close() {
        await mongoose.connection.close();
        instance = null;
    }

    async open(dbname, collName) {
        try {
            await instance.connect(dbname, collName);
        } finally {
            await instance.close();
        }
    }

    async insertManyAppartments(data) {
        try{
            await this.connect();
            const result = await Appartment.insertMany(data);
            console.log('Appartments inserted successfully:', result);
            return result;
        } catch (error) {
            console.error('An error occurred while saving appartments:', error);
        } finally{
            await this.close();
        }
    }
    
    async getAllAppartments() {
        try{
            await this.connect();
            const releases = await Appartment.find({}).select('-_id -__v');
            return releases;
        } catch (error) {
            console.error('An error occurred while retrieving appartments:', error);
        } finally{
            await this.close();
        }
    }

    async getAppartmentsByCityAndFilters(city, area, filters) {
        try{
            await this.connect();
            if (!city || typeof filters !== 'object') {
                throw new Error('Invalid input parameters');
            }
            const query = this.appartmentQuery(city, area, filters);
            const releases = await Appartment.find({query}).select('-_id -__v');
            return releases;
        } catch (error) {
            console.error('An error occurred while retrieving appartments:', error);
        } finally{
            await this.close();
        }
    }

    appartmentQuery(city, area, filters){

        const query = { city: city};

        if (area !== 'all') {
            query.area = area;
        }

        if (filters.furnishing) {
            query.furnishing = filters.furnishing;
        }

        // Add rent range query if both minimum and maximum are provided
        if (filters.rent && filters.rent.minimum !== undefined 
            && filters.rent.maximum !== undefined) {
            query.rent = {
                $gte: filters.rent.minimum,
                $lte: filters.rent.maximum
            };
        }

        // Add size range query if both minimum and maximum are provided
        if (filters.size && filters.size.minimum !== undefined 
            && filters.size.maximum !== undefined) {
            query.size = {
                $gte: filters.size.minimum,
                $lte: filters.size.maximum
            };
        }
        return query;
    }

    async deleteMany() {
        try {
            await this.connect();
            await Appartment.deleteMany({});
        } catch (error) {
            console.error('An error occurred while deleting:', error);
        } finally{
            await this.close();
        }
    }
}

module.exports = {DB};