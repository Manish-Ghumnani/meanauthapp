const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//to push local changes to heroku
const cool = require('cool-ascii-faces');
//port number to use
//const port = 3000;
const port = process.env.PORT || 8080;


//a route to cool 
// express().get('/cool', (req, res) => res.send(cool()));
//   use(express.static(path.join(__dirname, 'public')))
  
  //.listen(PORT, () => console.log(`Listening on ${ PORT }`))

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
app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   .get('/', (req, res) => res.render('pages/index'))
   .get('/cool', (req, res) => res.send(cool()));

//body parser midleware for json processing
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const users = require('./routes/users');


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