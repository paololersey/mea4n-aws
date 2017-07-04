var router = require('express').Router()
var Message = require('../models/message')
var parsingMessage = require('../logic/parsingMessage')
var elaborateMessage = require('../logic/elaborateMessage')


router.post('/api/restGet', function (req, res, next) {
    var fullSender = req.body.sender;
    var text = req.body.text;
    // here we parse the message
    console.log("sender=" + fullSender + ", text=" + text)
    var message = parsingMessage.parsingMessage(req.body);
    console.log("dopo parsing sender=" + sender + ", text=" + message)
    if (!message.date || !message.code) {
        // message not correct
        return res.status(500).json(message)
    }


    var sender = fullSender.substring(2, fullSender.length);
    elaborateMessage.findAndSaveMessage(sender, message, next).then(messageParsed => {
        elaborateMessage.updateMachineWithStatus(messageParsed).then((result) => {
                if (result.ok) {
                    return res.status(200).json(result)
                }
                //if (process.env.BITNAMI_ROOT) {
                    elaborateMessage.sendMail(message).then((infoMessage) => {
                            //NOP return res.status(200).json(infoMessage)
                            var output = {
                                "infoMessage": infoMessage,
                                "result": result
                            }
                            return res.status(200).json(output)
                        },
                        (error) => {
                            var output = {
                                "error": error,
                                "result": result
                            }
                            return res.status(200).json(output)
                        })
               /* }
                else{
                    return res.status(200).json(result)
                }*/

            },
            err => {
                var errMessage = {
                    "message": messageParsed,
                    "err": err.message
                }
                return res.status(500).json(errMessage)
            });
    });
})


module.exports = router