const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const db = require('./config/database')

// Test DB
db.authenticate()
    .then(res=>console.log('Database connected...'))
    .catch(err=>console.log('Error: ',err))
const app = express();

// Gig routes
app.use('/gigs',require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`))