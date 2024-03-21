const express = require('express');
const path = require('path');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const { OAuth2Client } = require('google-auth-library');
const session = require('express-session');


const {leasesRouter} = require('./routes/leases.js');
const {leaseUploadRouter} = require('./routes/lease-upload.js');
const {leaseReport} = require('./routes/lease-reports.js');
const {leaseDelete} = require('./routes/lease-delete.js');
const {filtersRouter} = require('./routes/filters.js');

const users = [];

  
const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const _dirname = __dirname || path.dirname(_filename);


const { config } = require('dotenv');
const envPath = path.resolve(_dirname, '../.env');
config({ path: envPath });

const app = express();

// Add middleware to serve static files
app.use(
    express.static(path.join(path.dirname(_filename), '..', 'client', 'build'))
);

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to compress data
app.use(compression());

app.use(
    fileUpload({
        createParentPath: true,
    })
);

// Used to salt the hash---change periodically
// resave, saveunitialized??
app.use(session({
    secret: 'shhh',
    // resave: false,
    // saveUninitialized: true
}));


// Use releases router
app.use('/leases/', leasesRouter);
app.use('/filters/', filtersRouter);
app.use('/leaseUpload/', leaseUploadRouter);
app.use('/leaseReport/', leaseReport);
app.use('/leaseDelete/', leaseDelete);


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
        // Check if the user already exists in the in-memory "database"
        const existsAlready = users.findIndex((user) => user.email === payload.email);

        if (existsAlready !== -1) {
            // Update the existing user
            users[existsAlready] = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
            };
        } else {
            // Create a new user and add to the in-memory "database"
            const newUser = {
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
            };
            users.push(newUser);
        }

        // req.session.user = {
        //     email: payload.email,
        //     name: payload.name,
        //     picture: payload.picture,
        // };
        
        // Store userId in the session
        req.session.userId = payload.email;


        res.status(201).json({ message: 'Login successful', data: payload });

        console.log('USERSSS->>', users);

    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Login failed', error: error.message });
    }
});


app.delete('/logout', async(req, res) => {
    try {
        await req.session.destroy();
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// get api for restricted access
app.get('/restrictedAccess', (req, res) => {
    if (req.session.userId){
        res.status(200).json({ userId: req.session.userId });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});



app.use((req, res) => {
    res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };

