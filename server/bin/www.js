const {app} = require('../api');
const path = require('path');
process.env.DEBUG = 'server';
const debug = require('debug');
const logger = debug('server');

const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const _dirname = __dirname || path.dirname(_filename);

const { config } = require('dotenv');
const envPath = path.resolve(_dirname, '../.env');
config({ path: envPath });
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    logger('started listening on port ' + port);
});

process.on('SIGINT', () => {
    logger('SIGINT signal received: closing HTTP server');
    server.close(() => {
    
        logger('HTTP server closed');
    
    });
});