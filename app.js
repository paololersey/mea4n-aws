// set up ======================================================================
/*var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);*/

const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  contentTypes = require('./utils/content-types'),
  sysInfo = require('./utils/sys-info'),
  express  = require('express'),
  bodyParser = require('body-parser'),
  cron = require('node-cron'),
  morgan   = require('morgan'),
  methodOverride = require('method-override'),
  env = process.env;


// timezone setting
process.env.TZ= 'Europe/Rome' 

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use( require('./static'))

//require('./static.js')(app);
//app.use(express.static(__dirname + '/frontend/dist'))

/*app.use( require('./express/api/messageInterceptor'))
app.use( require('./express/api/operateOnMessages'))
app.use( require('./express/api/operateOnIncomes'))
app.use( require('./express/api/operateOnMachines'))
app.use( require('./express/api/operateOnErrorMaps'))
app.use( require('./express/api/cron'))
app.use( require('./express/api/getTotalMoneyInstaneous'))*/

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(morgan('dev')); // log every request to the console

var server = app.listen(process.env.NODE_PORT || process.env.PORT || 8080,   function () {
    console.log('Server listening on', 8080)
})

exports.closeServer = function(){
  server.close();
};
