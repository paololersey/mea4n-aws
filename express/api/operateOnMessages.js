var router = require('express').Router()
var Message = require('../models/message')
var messageDao = require('../dao/messageDao')
var cron = require('node-cron')
var moment = require('moment')
var elaborateMessage = require('../logic/elaborateMessage')
var parsing = require('../logic/parsingMessage')

var EXCEL_ROWS_MAX_LENGTH = 5000
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
        }, (err) =>{
            res.status(500).json(err);
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

router.post('/api/messagesCount',
    function (req, res, next) {
   
        messageDao.findPeriodMessagebyFilter(req.body.reportSearch, (err, messages) => {
            if (err) return next(err)
            
            var result = "OK"
            if (messages.length > EXCEL_ROWS_MAX_LENGTH) {
                result = "Number of rows exceeding " + EXCEL_ROWS_MAX_LENGTH
                return res.status(202).json(result)
            }
            return res.status(200).json(result)
        });
    });

router.get('/api/sendTestMail',
    function (req, res, next) {
    var messageErrorTest = {
            "text": `A-SPIN RPT:
WARNING:
ERROR=C2
2020/05/16 19:01:05`
        }

        var messageErrorTest = parsing.parsingMessage(messageErrorTest)
    elaborateMessage.sendMail(messageErrorTest).then(
        (infoMessage) => {
            console.log("infoMessage=" + infoMessage)
            var obj = {};
            obj.infoMessage = infoMessage
            return res.status(200).json(obj)
        },
        (err) => {
            return res.status(500).json(obj)
        })
}) 



module.exports = router