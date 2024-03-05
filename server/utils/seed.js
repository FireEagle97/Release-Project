const {DB}  = require('../db/db.js');
const {getAllLeases} = require('./data-init.js');

require('dotenv').config();
const debug = require('debug');
const logger = debug('server:seeded database');


(async () => {
    try {
        const db = new DB();

        //await db.deleteMany();
        const data = await getAllLeases();
        await db.createManyLeases(data);
        logger('data seeded', data);
        logger('seeded database');


        // Close the database connection (if your DB class supports this)
        await db.close();

        // Exit the program with a success code (0)
        process.exit(0);
    } catch (e) {
        console.error('Could not connect or insert data:', e);
        // Exit the program with an error code (1)
        process.exit(1);
    }
})();
