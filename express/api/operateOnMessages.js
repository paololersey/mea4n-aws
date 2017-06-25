var router = require('express').Router()
var Message = require('../models/message')
var messageDao = require('../dao/messageDao')
var cron = require('node-cron')
var moment = require('moment')


// get all messages
router.get('/api/getMessages',
    function (req, res, next) {
        messageDao.findAllMessages((err, messages) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(messages)
        });
    });

router.get('/api/getDayMessage/:machineId',
    function (req, res, next) {
        let machineId = req.params.machineId;
        let startDate = moment().startOf('day');
        let endDate = moment().endOf('day');
        let promise = messageDao.findPeriodMessagebyMachineNumber(machineId, startDate, endDate);
        promise.then((messages) => {
            res.status(200).json(messages);
        });

    });

// remove messages
router.get('/api/removeMessages',
    function (req, res, next) {
        messageDao.removeAllMessages(err => {
            if (err) return handleError(err);
            res.status(200).json("removed all messages!")
        });
    });



module.exports = router