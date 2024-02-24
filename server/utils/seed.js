/* eslint-disable no-console */
const {DB} = require('../db/db');
const { readAndParseCSVRents} = require('./dataFetcher');

/**
 * Seed the database with data from a CSV file.
 */
async function seedDatabase(){
    let db;
    try {
        const db = new DB();
        await db.connect('Cluster0');
        await db.deleteMany({});
        console.log('deleted');
        // const dataAppartments = 
        //         await readAndParseCSVRents('../data/house_renting_dataset.csv');
        // const numAppartments = await db.insertManyAppartments(dataAppartments);
        // console.log(`Inserted ${numAppartments} rows`);
        console.error('MongoDB successfully seeded');
    } catch (e) {
        console.error('could not seed');
        console.dir(e);
    } finally {
        if (db) {
            db.close();
        }
        process.exit();
    }
}
  
seedDatabase();