const express = require('express');
const path = require('path');
const compression = require('compression');
const fileUpload = require('express-fileupload');
//const {commentRouter} = require('./routes/comments.js');

const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const _dirname = __dirname || path.dirname(_filename);

const { config } = require('dotenv');
const envPath = path.resolve(_dirname, '../.env');
config({ path: envPath });

const app = express();

// Add middleware to serve static files
app.use(express.static(path.join(path.dirname(_filename), '..', 
    'release', 'build')));

// Middleware to parse JSON requests
app.use(express.json()); 

// Middleware to compress data
app.use(compression());

app.use(
    fileUpload({
        createParentPath: true,
    })
);
  

// get filtered releases - results
app.get('/view-releases/', (req, res)=>{
    
});

// post releases
app.post('/release-apply/', (req, res)=>{
    
});

// 404 route 
app.use((req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };
