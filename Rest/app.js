const config = require('config'); //Node-config organizes hierarchical configurations for your app deployments.
const startupDebugger = require('debug')('app:startup'); //A tiny JavaScript debugging utility modelled after Node.js core's debugging technique. Works in Node.js and web browsers.
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet'); //Helmet helps you secure your Express apps by setting various HTTP headers.
const morgan = require('morgan') //HTTP request logger middleware for node.js
const express = require('express'); //Fast, unopinionated, minimalist web framework for node
const Joi = require('joi');// Object schema description language and validator for JavaScript objects.
const app = express();
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');


// default view template that uses pug engine
app.set('view engine', 'pug');
app.set('views','./views'); 

console.log(`NODE_ENV:  ${process.env.NODE_ENV}`);
console.log(`app  ${app.get('env')}`);


app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value...
app.use(express.static('public')); //static assets: css, images etc.. go now inside our folder 'public'
app.use(helmet())
app.use('/api/courses', courses);
app.use('/', home);

// CONFIGURATION
console.log('Application name: ' + config.get('name'))
console.log('Application host: ' + config.get('mail.host'))
console.log('Application mail password: ' + config.get('mail.password'))


if (app.get('env') === 'development'){
    app.use(morgan('tiny'))
    startupDebugger('Morgan enable...');
}

app.use(logger); // use custom middleware
// we can create middle ware function to put on the req...res pipeline process
// express is nothin more then pipeline middleware between req and res.
app.use(function(req,res,next){ // the next function is mandatory to give continuity to the pipeline flow
    console.log('authenticating...' );
    next();
});

// PORT --environment variable that the value is set outside.
// powershell commnad -> $env:PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


