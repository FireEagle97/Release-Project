/* eslint-disable no-console */
require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const mongoose = require('mongoose');
const { leases } = require('./schemas');
// const appartments = require('../routes/leases');

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

    async createManyLeases(data) {
        try{
            await this.connect();
            const result = await leases.insertMany(data);
            // console.log('Leases inserted successfully:', result);
            return result;
        } catch (error) {
            console.error('An error occurred while saving leases:', error);
        } finally{
            await this.close();
        }
    }
    
    async getAllLeases() {
        try{
            await this.connect();
            const appartmentList = await leases.find({}).select('-_id -__v');
            return appartmentList;
        } catch (error) {
            console.error('An error occurred while retrieving leases:', error);
        } finally{
            await this.close();
        }
    }

    async getLeasesByCityAndFilters(city, area, filters) {
        try{
            await this.connect();
            if (!city || typeof filters !== 'object') {
                throw new Error('Invalid input parameters');
            }
            const query = this.appartmentQuery(city, area, filters);
            const releases = await leases.find(query).select('-_id -__v');
            return releases;
        } catch (error) {
            console.error('An error occurred while retrieving leasess:', error);
        } finally{
            await this.close();
        }
    }

    leaseQuery(city, area, filters){

        const query = { city: city};

        if (area) {
            query.areaType = area;
        }

        if (filters.furnishing) {
            query.furnishing = filters.furnishing;
        }

        // Add rent range query if both minimum and maximum are provided
        if (filters.rent && filters.rent.minimum !== undefined 
            && filters.rent.maximum !== undefined) {
            query.rentPrice = {
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
            await leases.deleteMany({});
        } catch (error) {
            console.error('An error occurred while deleting:', error);
        } finally{
            await this.close();
        }
    }
}

module.exports = {DB};