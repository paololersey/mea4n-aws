var request = require("request"),
    assert = require('assert'),
    app = require("../app.js"),
    base_url = "http://localhost:3000/",
    parsing = require('../express/logic/parsingMessage'),
    elaborateMessage = require('../express/logic/elaborateMessage'),
    machineDao = require('../express/dao/machineDao'),
    messageDao = require('../express/dao/messageDao')

describe("getting last error message", () => {
    it("got last error message", (done) => {
        var asyncFunction = new Promise((resolve, reject) => {
            var bodyOkText = {
                "text": `A-SPIN RPT:
WARNING:
ERROR=A6
2017/05/20 19:01:05`
            }
            var next = ""
            var sender = "3939393939"
            var messageDangerTest = parsing.parsingMessage(bodyOkText)
            try {
                machineDao.findMachineIdByNumber(sender, (err, machine) => {
                    messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
                        elaborateMessage.findAndSaveMessage(sender, messageDangerTest, next).then((message) => {
                            messageDao.findLastMessagebyMachineid(machine[0].machineId).then(
                                lastMessage => {
                                    resolve(lastMessage[0])
                                },
                                err => reject(Error(error))
                            )
                        })
                    })
                });
            } catch (error) {
                reject(Error(error))
            }
        })



        asyncFunction.then((lastMessagedAdded) => {
            try {
                assert.equal(lastMessagedAdded.date.toString(), new Date('2017-05-20T17:01:00.000Z').toString());
                assert.equal(lastMessagedAdded.machine, "1000");
                assert.equal(lastMessagedAdded.errorCode.substring(0,2), "A6");
                done();
                app.closeServer();
            } catch (err) {
                done(err);
                app.closeServer();
            }
        }, done);

    });

});