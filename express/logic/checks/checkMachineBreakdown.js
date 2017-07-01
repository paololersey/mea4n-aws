var machineDao = require("../../dao/machineDao")
var messageDao = require("../../dao/messageDao")
var machineStatus = require("../../logic/machineStatus")
var moment = require("moment")

exports.checkMachineBreakdown = function () {

    return new Promise((resolve, reject) => {
        try {
            machineDao.findAllMachines((err, machineNumbers) => {
                console.log("find all machines done")
                var lastMessagePromises = new Array()
                for (let k = 0; k < machineNumbers.length; k++) {
                    lastMessagePromises.push(messageDao.findLastMessageParsed(machineNumbers[k].machineId));
                }
                var updateNocommunicationErrorPromises  = new Array()
                Promise.all(lastMessagePromises).then((messages) => {
                        for (let k = 0; k < messages.length; k++) {
                            if (messages[k][0] && messages[k][0].date) {
                                var lastDate = moment(messages[k][0].date);
                                var nowTwoHoursBefore = moment().add('hours', -2);
                                var lastDateTwoHoursBefore = moment(messages[k][0].date)
                                if (lastDate.isBefore(nowTwoHoursBefore)) {
                                    updateNocommunicationErrorPromises.push(machineDao.updateMachine(messages[k][0].machine, "ER"))
                                    console.log("messagesDate=" + lastDate);
                                }
                            }
                        }
                        if (updateNocommunicationErrorPromises.length > 0) {
                            Promise.all(updateNocommunicationErrorPromises).then( (result) => {
                                    for (let k = 0; k < updateNocommunicationErrorPromises.length; k++) {
                                        console.log("result" + result);
                                    }
                                    resolve("COMM ERROR RETRIEVED")
                                },
                                (err) => {
                                    reject(Error(err))
                                })

                        } else {
                            resolve("OK")
                        }

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