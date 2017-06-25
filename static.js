var express = require('express')
var sysInfo = require('./utils/sys-info')
var router = require('express').Router()

router.use(express.static(__dirname + 'frontend/dist'))

//router.use(express.static(__dirname + '/../frontend/dist'))
//app.use(express.static(__dirname + '/public'))

//module.exports = function (app) {
router.get('/', function (req, res) {
  res.sendfile('frontend/dist/index.html')
  //res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
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
//}

module.exports = router;