var express = require('express')
var router = require('express').Router()

router.use(express.static(__dirname + '/../frontend/dist'))

router.get('/', function (req, res) {
  res.sendfile('./frontend/dist/index.html')
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