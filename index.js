const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const http = require('http-server');

const DEFAULT_PORT = 3001;

// This connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();  //Commented to test the IIS NODE
//const app = http.createServer(app);

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


app.set("port", process.env.PORT || DEFAULT_PORT);

// Handles all routes so you do not get a not found error
//app.get('*', function (request, response){
//    response.sendFile(path.resolve(__dirname, './server/static/', 'index.html'))
//});

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, './', 'index.html'))
});

app.use(express.static(__dirname + './server/static/'));


// start the server
app.listen(DEFAULT_PORT, 'A001155', () => {
  console.log('Server is running on A001155:', DEFAULT_PORT);
});
