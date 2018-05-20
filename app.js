const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//cors allow request to our api from a different domain name
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

//on succesful connectino to database
mongoose.connection.on('connected', () => {
    console.log('Connected to database' +config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error' +err);
})



//our app
const app = express();

//enabling cors
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser midleware for json processing
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const users = require('./routes/users');

//port number to use
const port = 3000;


app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//every route other than that specified should go to index.html
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('Server starte on port ' +port)
});