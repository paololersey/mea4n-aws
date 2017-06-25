var app = require('app')
var router = require('express').Router()
var sysInfo  = require('./utils/sys-info')

//router.use(express.static(__dirname + '/../frontend/dist'))
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  //res.sendfile('frontend/dist/index.html')
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
})


app.get('/api/messages', function (req, res, next) {
    Post.find()
        .sort('-date')
        .exec((err, messages) => {
            if (err) {
                return next(err)
            }
            res.json(messages)
        })
})


// openshift monitoring services

app.get('/health', (req, res) => {
  res.writeHead(201);
  res.end();
})

app.get('/info/gen', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  console.log(sysInfo[req.url.slice(6)]());
  res.end(JSON.stringify(sysInfo[req.url.slice(6)]()));
})

router.get('/info/poll', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo[req.url.slice(6)]()));
})


module.exports = router