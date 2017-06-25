
var router = require('express').Router()
var sysInfo = require('./utils/sys-info')

//router.use(express.static(__dirname + '/../frontend/dist'))
//app.use(express.static(__dirname + '/public'))

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendfile('frontend/dist/index.html')
    //res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
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
}