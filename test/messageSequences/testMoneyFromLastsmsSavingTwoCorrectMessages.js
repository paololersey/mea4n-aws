var request = require("request"),
    assert = require('assert'),
    app = require("../../app.js"),
    base_url = "http://localhost:3000/",
    parsing = require('../../express/logic/parsingMessage'),
    elaborateMessage = require('../../express/logic/elaborateMessage'),
    machineDao = require('../../express/dao/machineDao'),
    messageDao = require('../../express/dao/messageDao')

describe("Try to save two correct message", () => {
    it("saved two correct messages and removed, testing moneyFromLastsms!", (done) => {
        var asyncFunction = new Promise((resolve, reject) => {
            var firstBodyOkText = {
                "text": `A-SPIN RPT:
$:   10.00
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2017/05/13 19:00:80`
            }

            var secondBodyOkText = {
                "text": `A-SPIN RPT:
$:    24.00
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2017/05/13 20:00:80`
            }

            var next = ""
            var sender = "3939393939"
            var firstMessageOkTest = parsing.parsingMessage(firstBodyOkText)
            var secondMessageOkTest = parsing.parsingMessage(secondBodyOkText)
            try {
                machineDao.findMachineIdByNumber(sender, (err, machine) => {
                    messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
                        elaborateMessage.findAndSaveMessage(sender, firstMessageOkTest, next).then((message) => {
                            elaborateMessage.findAndSaveMessage(sender, secondMessageOkTest, next).then((message) => {
                                messageDao.findLastMessagebyMachineId(message.machine, (err, lastMessage) => {
                                    messageDao.removeMessageByMachineId(lastMessage[0].machine, () => {
                                        resolve(lastMessage[0])
                                    });
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
                assert.equal(lastMessagedAdded.date.toString(), new Date('2017-05-13T18:00:00.000Z').toString());
                assert.equal(lastMessagedAdded.machine, "1000");
                assert.equal(lastMessagedAdded.moneyFromLastSms.value, parseFloat(14));
                done();
                app.closeServer();
            } catch (err) {
                done(err);
                app.closeServer();
            }
        }, done);

    });

});