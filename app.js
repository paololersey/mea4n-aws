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
app.use( require('./express/static'))


app.use( require('./express/api/messageInterceptor'))
app.use( require('./express/api/operateOnMessages'))
app.use( require('./express/api/operateOnIncomes'))
app.use( require('./express/api/operateOnMachines'))
app.use( require('./express/api/operateOnErrorMaps'))
app.use( require('./express/api/cron'))
app.use( require('./express/api/getTotalMoneyInstaneous'))

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(morgan('dev')); // log every request to the console

var server = app.listen(process.env.NODE_PORT || process.env.PORT || 8080,   function () {
    console.log('Server listening on', 8080)
})

exports.closeServer = function(){
  server.close();
};
