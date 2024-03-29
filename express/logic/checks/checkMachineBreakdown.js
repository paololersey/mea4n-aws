var machineDao = require("../../dao/machineDao")
var messageDao = require("../../dao/messageDao")
var moment = require("moment")
var mail = require('../mail')

exports.checkMachineBreakdown = function () {

    return new Promise((resolve, reject) => {
        try {
            machineDao.findAllMachines((err, machineNumbers) => {

                var lastMessagePromises = new Array()
                for (let k = 0; k < machineNumbers.length; k++) {
                    lastMessagePromises.push(messageDao.findLastMessageParsed(machineNumbers[k].machineId));
                }
                var updateNocommunicationErrorPromises = new Array()
                var updateStatusOkPromises = new Array()
                var sendMailTimeoutArray = new Array()

                Promise.all(lastMessagePromises).then((messages) => {
                        for (let k = 0; k < messages.length; k++) {
                            if (messages[k][0] && messages[k][0].date) {
                                var lastDate = moment(messages[k][0].date);
                                var threeTwoHoursBefore = moment().add('hours', -3);
                                var nowTwoHoursBefore = moment().add('hours', -2);
                                if (lastDate.isBefore(nowTwoHoursBefore)) {
                                    console.log("machine " + messages[k][0].machine + " is in timeout")
                                    updateNocommunicationErrorPromises.push(machineDao.updateMachine(messages[k][0].machine, "TI"))
                                    if (lastDate.isAfter(threeTwoHoursBefore)) {
                                        sendMailTimeoutArray.push(mail.sendMail('TI', messages[k][0].machine, lastDate.toLocaleString));
                                    }
                                } else {
                                    if (!messages[k][0].errorCode) {
                                        console.log("machine " + messages[k][0].machine + " will pass from timeout to OK")
                                        updateStatusOkPromises.push(machineDao.updateMachine(messages[k][0].machine, "OK"))
                                    }

                                }
                            }
                        }


                        Promise.all(updateStatusOkPromises).then((result) => {
                                if (updateNocommunicationErrorPromises.length > 0) {
                                    Promise.all(updateNocommunicationErrorPromises).then((result) => {
                                            if (sendMailTimeoutArray.length > 0) {
                                                Promise.all(sendMailTimeoutArray).then((result) => {
                                                        console.log("result" + result);
                                                    },
                                                    (err) => {
                                                        reject(Error(err))
                                                    })
                                            }
                                        },
                                        (err) => {
                                            reject(Error(err))
                                        })
                                } else {
                                    resolve("ONLY STATUS OK")
                                }
                            },
                            (err) => {
                                reject(Error(err))
                            })


                    },
                    (err) => {
                        reject(Error(err))
                    })

            })
        } catch (error) {
            reject(Error(error))
        }
    })
}