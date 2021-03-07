var assert = require('assert'),
    app = require("../../app.js"),
    base_url = "http://localhost:3000/",
    parsing = require('../../express/logic/parsingMessage'),
    elaborateMessage = require('../../express/logic/elaborateMessage'),
    machineDao = require('../../express/dao/machineDao'),
    messageDao = require('../../express/dao/messageDao'),
    machineDao = require('../../express/dao/machineDao'),
    mapErrorCodeToStatus = require('../../express/logic/mapErrorCodeToStatus')

describe("Save an OK message then Error:", () => {
    it("saved those messages with email", (done) => {
        var asyncFunction = new Promise((resolve, reject) => {
            var firstBodyOkText = {
                "text": `A-SPIN RPT:
$:    3.00
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2017/05/15 01:00:80`
            }

            var secondBodyOkText = {
                "text": `A-SPIN RPT:
WARNING:
ERROR=B2
2017/05/16 19:01:05`
            }

            var next = ""
            var sender = "3939393939"
            var firstMessageOkTest = parsing.parsingMessage(firstBodyOkText)
            var secondMessageErrorTest = parsing.parsingMessage(secondBodyOkText)
            try {
                machineDao.findMachineIdByNumber(sender, (err, machine) => {
                    messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
                        elaborateMessage.findAndSaveMessage(sender, firstMessageOkTest, next).then((message) => {
                            elaborateMessage.findAndSaveMessage(sender, secondMessageErrorTest, next).then((message) => {
                                elaborateMessage.updateMachineWithStatus(secondMessageErrorTest).then((returnedMessageErrorTest) => {
                                    machineDao.findMachineById(returnedMessageErrorTest.machine).then((result) => {
                                        messageDao.removeMessageByMachineId(returnedMessageErrorTest.machine, function () {
                                            elaborateMessage.sendMail(returnedMessageErrorTest).then(
                                                (infoMessage) => {
                                                    console.log("infoMessage=" + infoMessage)
                                                    var obj = {};
                                                    obj.machineStatus = result[0].status
                                                    obj.lastMessagedAdded = returnedMessageErrorTest
                                                    obj.infoMessage = infoMessage
                                                    resolve(obj)
                                                },
                                                (err) => {
                                                    reject(obj)
                                                })

                                        });

                                    });
                                })

                            });

                        })
                    })
                });
            } catch (error) {
                reject(Error(error))
            }
        })


        asyncFunction.then((obj) => {
            try {
                assert.equal(obj.lastMessagedAdded.date.toString(), new Date('2017-05-16T17:01:00.000Z').toString());
                assert.equal(obj.lastMessagedAdded.errorCode, "B2");
                assert.equal(obj.machineStatus, "ER")
                done();
                app.closeServer();
            } catch (err) {
                done(err);
                app.closeServer();
            }
        }, done);

    });

});