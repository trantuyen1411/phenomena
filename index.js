// Use the dotenv package, to create environment variables
require('dotenv').config();

// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000const PORT = 3000;
const PORT = process.env.PORT || 3000;


// Import express, and create a server
const express = require('express');
const server = express();
// Require morgan and body-parser middleware
const morgan = require('morgan');

const bodyParser = require('body-parser')

// Have the server use morgan with setting 'dev'
server.use(morgan('dev'));
// Import cors 
// Have the server use cors()
const cors = require('cors');
server.use(cors());

// Have the server use bodyParser.json()
server.use(bodyParser.json());

// Import the API router
const apiRouter = require('./api');

// Have the server use your API router with prefix '/api'
server.use('/api', apiRouter);

// Import the client from your db/index.js
const { client } = require('./db');


// Create custom 404 handler that sets the status code to 404.
server.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
  });

// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

// Start the server listening on port PORT
server.listen(PORT, async () => {
    try {
      // On success, connect to the database
      await client.connect();
      console.log(`Server is listening on port ${PORT}`);
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  });
