var express = require('express')
var router = require('express').Router()
var sysInfo  = require('../utils/sys-info')

//router.use(express.static(__dirname + '/../frontend/dist'))
router.use(express.static(__dirname + '/public'))
router.get('/', function (req, res) {
  //res.sendfile('frontend/dist/index.html')
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
})


router.get('/api/messages', function (req, res, next) {
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

router.get('/health', (req, res) => {
  res.writeHead(201);
  res.end();
})

router.get('/info/gen', (req, res) => {
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