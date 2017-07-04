var router = require('express').Router()
var Message = require('../models/message')
var parsingModule = require('../logic/parsingMessage')
var messageDao = require('../dao/messageDao')
var machineDao = require('../dao/machineDao')
var mapErrorCodeToStatus = require('../logic/mapErrorCodeToStatus')
var machineStatus = require('../logic/machineStatus')
var mail = require('../logic/mail')

exports.findAndSaveMessage = (sender, message, next) => {
    return new Promise((resolve, reject) => {
        try {
            machineDao.findMachineIdByNumber(sender, (err, machine) => {
                if (machine) {
                    try {
                        messageDao.findLastMessagebyMachineId(machine[0].machineId, (err, lastMessage) => {
                            if (err) {
                                return next(err)
                            }
                            message.machine = machine[0].machineId;
                            message.moneyFromLastSms = 0;
                            if (lastMessage !== null && lastMessage.length == 1) {
                                if (message.money) {
                                    message.moneyFromLastSms = message.money - lastMessage[0].money;
                                    if (message.moneyFromLastSms > 0) console.log("money is not the same as last message, so moneyFromLastSms=" + message.moneyFromLastSms)
                                    if (!message.moneyFromLastSms || message.moneyFromLastSms < 0) {
                                        message.moneyFromLastSms = message.money;
                                        if (message.moneyFromLastSms < 0 && process.env.BITNAMI_ROOT) {
                                            mail.sendMail("INCOME CLEAR", message.machine, message.date).then(
                                                (infoMessage) => {
                                                    resolve(infoMessage)
                                                },
                                                (error) => {
                                                    reject(Error(error))
                                                }
                                            )
                                        }

                                    }
                                } else {
                                    message.money = 0
                                    message.moneyFromLastSms = 0
                                }
                                try {
                                    messageDao.saveMessage(message, next)
                                    resolve(message)
                                } catch (err) {
                                    reject(Error(err))
                                }


                            } else {
                                console.log("found no message, saving it")
                                try {
                                    message.moneyFromLastSms = message.money
                                    messageDao.saveMessage(message)
                                    resolve(message)
                                } catch (err) {
                                    reject(Error(err));
                                }
                            }
                        })
                    } catch (error) {
                        reject(Error(error))
                    }
                }
            })
        } catch (error) {
            reject(Error(error))
        }
    })
}

exports.updateMachineWithStatus = (messageParsed) => {
    return new Promise((resolve, reject) => {
        if (messageParsed.status && messageParsed.status == 'PA') {
            // message correctly parsed 
            console.log("message parsed errorCode=" + messageParsed.errorCode)
            if (messageParsed.errorCode) {
                mapErrorCodeToStatus.mapErrorCodeToStatus(messageParsed.errorCode,
                    (err, errorMap) => {
                        if (err) reject(Error(err))
                        machineStatus.updateMachine(messageParsed.machine, errorMap[0].machineStatus).then(
                            (result) => {
                                console.log("Status to update-----" + errorMap[0].machineStatus)
                                console.log("--" + result.ok)
                                if (result && result.ok && errorMap[0] && errorMap[0].emailToSend == 'Y') {
                                    resolve(messageParsed);
                                } else {
                                    resolve(result);
                                }

                            },
                            (err) => {
                                reject(Error(err));
                            })

                    }
                )
            } else {
                resolve("OK")

            }
        } else {
            messageParsed.errorCode = text;
            resolve(messageParsed);
        }
    });
}
exports.sendMail = (messageParsed) => {
    return new Promise((resolve, reject) => {
        if (messageParsed.errorCode) {
            mail.sendMail(messageParsed.errorCode, messageParsed.machine, messageParsed.date).then(
                (infoMessage) => {
                    resolve(infoMessage)
                },
                (error) => {
                    reject(Error(error))
                }
            )
        } else {
            resolve(messageParsed)
        }
    })
}