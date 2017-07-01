var assert = require('assert'),
    app = require("../../app.js"),
    base_url = "http://localhost:3000/",
    parsing = require('../../express/logic/parsingMessage'),
    elaborateMessage = require('../../express/logic/elaborateMessage'),
    machineDao = require('../../express/dao/machineDao'),
    messageDao = require('../../express/dao/messageDao')

describe("Try to save an OK message, then error, then OK message", () => {
    it("saved an ok message, then error, then OK message. Testing moneyFromLastsms!", (done) => {
        var asyncFunction = new Promise((resolve, reject) => {
            var firstBodyOkText = {
                "text": `A-SPIN RPT:
$:   8.00
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2017/05/16 15:00:80`
            }

            var secondBodyErrorText = {
                "text": `A-SPIN RPT:
SYSTEM ERROR
ERROR=B2
2017/05/16 15:51:20`
            }


            var thirdBodyOkText = {
                "text": `A-SPIN RPT:
$:    15.00
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2017/05/16 18:00:80`
            }

            var next = ""
            var sender = "3939393939"
            var firstMessageOkTest = parsing.parsingMessage(firstBodyOkText)
            var secondMessageErrorTest = parsing.parsingMessage(secondBodyErrorText)
            var thirdMessageOkTest = parsing.parsingMessage(thirdBodyOkText)
            try {
                machineDao.findMachineIdByNumber(sender, (err, machine) => {
                    messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
                        elaborateMessage.findAndSaveMessage(sender, firstMessageOkTest, next).then((message1) => {
                            elaborateMessage.findAndSaveMessage(sender, secondMessageErrorTest, next).then((message2) => {
                                elaborateMessage.findAndSaveMessage(sender, thirdMessageOkTest, next).then((message3) => {
                                    messageDao.findLastMessagebyMachineId(message3.machine, (err, lastMessage) => {
                                        messageDao.removeMessageByMachineId(lastMessage[0].machine, () => {
                                            var arrayMessages = [message1, message2, message3]
                                            var obj = {
                                                "arrayMessages": arrayMessages,
                                                "machine": machine[0]
                                            }
                                            resolve(obj)
                                        });
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


        asyncFunction.then((obj) => {
            try {
                let arrayMessages = obj.arrayMessages;
                let machine=obj.machine;
                assert.equal(arrayMessages[0].date.toString(), new Date('2017-05-16T13:00:00.000Z').toString());
                assert.equal(arrayMessages[1].date.toString(), new Date('2017-05-16T13:51:00.000Z').toString());
                assert.equal(arrayMessages[2].date.toString(), new Date('2017-05-16T16:00:00.000Z').toString());
                assert.equal(arrayMessages[0].machine, "1000");
                assert.equal(arrayMessages[0].status, "PA");
                assert.equal(arrayMessages[0].errorCode, null);
                assert.equal(arrayMessages[1].status, "PA");
                assert.equal(arrayMessages[1].errorCode.substring(0, 2), "B2");
                assert.equal(arrayMessages[2].status, "PA");
                assert.equal(arrayMessages[2].errorCode, null);
                
                done();
                app.closeServer();
            } catch (err) {
                done(err);
                app.closeServer();
            }
        }, done);

    });

});