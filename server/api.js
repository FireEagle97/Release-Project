const express = require('express');
const path = require('path');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const { OAuth2Client } = require('google-auth-library');

const {leasesRouter} = require('./routes/leases.js');
const {leaseUploadRouter} = require('./routes/lease-upload.js');

const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const _dirname = __dirname || path.dirname(_filename);

const { config } = require('dotenv');
const envPath = path.resolve(_dirname, '../.env');
config({ path: envPath });

const app = express();

// Add middleware to serve static files
app.use(express.static(path.join(path.dirname(_filename), '..', 
    'client', 'build')));

// Middleware to parse JSON requests
app.use(express.json()); 

// Middleware to compress data
app.use(compression());


app.use(
    fileUpload({
        createParentPath: true,
    })
);
  

// Use releases router
app.use('/leases/', leasesRouter);
app.use('/leaseUpload/', leaseUploadRouter);


// Add a POST API endpoint for login with token verification
app.post('/login', async (req, res) => {
    const { idToken } = req.body;
  
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);

    // console.log('CLIENT ID->>', clientId);
    // console.log('CLIENT->>', client);
    // console.log('ID TOKEN->>', idToken);
  
    try {
        // Call the verifyIdToken to verify and decode the token
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: clientId,
        });
  
        // Get the JSON with all the user info
        const payload = ticket.getPayload();
    
        res.json({ message: 'Login successful', data: payload });
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Login failed', error: error.message });
    }
});



// 404 route 
app.use((req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };
