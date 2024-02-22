const { DB } = require('../db/db.js');
// const {getAllLeases} = require('./data-init.js');
// const {Release} = require('../db/schemas.js');

process.env.DEBUG = 'server';
const debug = require('debug');
const logger = debug('server');


(async () => {
  try {
    const db = new DB();

    // const datas = await getAllLeases();
    const data = [{
        'posted_on': 'String1', 
        'bhk': 1,
        'rent': 1,
        'size': 1,
        'floor': 'String2',
        'area_type': 'String3',
        'area_local': 'String4',
        'city': 'String',
        'furnishing': 'String',
        'bathroom': 1
    }];
    await db.createManyLeases(data);
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