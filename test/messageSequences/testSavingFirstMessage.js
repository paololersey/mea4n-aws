var request = require("request"),
    assert = require('assert'),
    app = require("../../app.js"),
    base_url = "http://localhost:3000/",
    parsing = require('../../express/logic/parsingMessage'),
    elaborateMessage = require('../../express/logic/elaborateMessage'),
    machineDao = require('../../express/dao/machineDao'),
    messageDao = require('../../express/dao/messageDao')

describe("Try to save a correct message", () => {
    it("saved a correct message and removed!", (done) => {
        var asyncFunction = new Promise((resolve, reject) => {
            var bodyOkText = {
                "text": `A-SPIN RPT:
$:    460.00
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2017/05/13 19:00:80`
            }
            var next = ""
            var sender = "3939393939"
            var messageOkTest = parsing.parsingMessage(bodyOkText)
            try {
                machineDao.findMachineIdByNumber(sender, (err, machine) => {
                    messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
                        elaborateMessage.findAndSaveMessage(sender, messageOkTest, next).then((message) => {
                            messageDao.findLastMessagebyMachineId(message.machine,  (err, lastMessage) => {
                                messageDao.removeMessageByMachineId(lastMessage[0].machine, () => {
                                    resolve(lastMessage[0])
                                });
                            });
                        })
                    })
                });
            } catch (error) {
                reject(Error(error))
            }
        })



        asyncFunction.then((lastMessagedAdded) => {
            try {
                assert.equal(lastMessagedAdded.date.toString(), new Date('2017-05-13T17:00:00.000Z').toString());
                assert.equal(lastMessagedAdded.machine, "1000");
                done();
                app.closeServer();
            } catch (err) {
                done(err);
                app.closeServer();
            }
        }, done);
        
    });

});