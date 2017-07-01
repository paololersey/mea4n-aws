var assert = require('assert'),
  app = require("../../app.js"),
  base_url = "http://localhost:3000/",
  parsing = require('../../express/logic/parsingMessage'),
  computation = require('../../express/logic/computation'),
  dateUtils = require('../../express/logic/utils/dateUtils'),
  moment = require('moment'),
  elaborateMessage = require('../../express/logic/elaborateMessage'),
  machineDao = require('../../express/dao/machineDao'),
  messageDao = require('../../express/dao/messageDao')

describe("Compute the right amount:", function () {
  it("computed it", function (done) {
    /*var asyncFunction = new Promise((resolve, reject) => {
      var bodyOkText = {
        "text": `A-SPIN RPT:\r\n$:    12.00\r\nICE:   349.44 Kg\r\nBAG:AVAILABLE\r\nCHG:54.00\r\n2014/01/01 05:00:80`
      }
      var messageOkTest = parsing.parsingMessage(bodyOkText)

      var next = ""
      var sender = "3939393939"
      var messageOkTest = parsing.parsingMessage(bodyOkText)
      try {
        machineDao.findMachineIdByNumber(sender, (err, machine) => {
          messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
            elaborateMessage.findAndSaveMessage(sender, messageOkTest, next).then((message) => {

              messageDao.findLastMessagebyMachineId(message.machine, (err, lastMessage) => {

                var arrayStartDates = new Array();
                arrayStartDates.push(moment('2013-01-01').startOf('day'))
                arrayStartDates.push(moment('2013-01-01').startOf('day'))

                arrayStartDates.push(moment('2013-01-01').startOf('day'))
                arrayStartDates.push(moment('2013-01-01').startOf('day'))
                var arrayEndDates = new Array();
                arrayEndDates.push(moment('2015-01-01').endOf('day'))
                arrayEndDates.push(moment('2015-01-01').endOf('day'))
                arrayEndDates.push(moment('2015-01-01').endOf('day'))

                arrayEndDates.push(moment('2015-01-01').endOf('day'))
                computation.computeTotals(false, arrayStartDates, arrayEndDates).then((table) => {
                  
                    resolve(table)
                  },
                  (err) => {
                     console.log("ciao3")
                    resolve(Error(err))
                  });

              });
            })
          })
        });
      } catch (error) {
        reject(Error(error))
      }
    })*/

    var asyncFunction = new Promise((resolve, reject) => {
      var bodyOkText = {
        "text": `A-SPIN RPT:
$:    460.01
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2014/01/01 19:00:80`
      }
      var bodyOk2Text = {
        "text": `A-SPIN RPT:
$:    468.25
ICE:   345.44 Kg
BAG:AVAILABLE
CHG:54.00
2014/01/01 20:00:80`
      }
      var next = ""
      var sender = "3939393939"
      var messageOkTest = parsing.parsingMessage(bodyOkText)
      var messageOk2Test = parsing.parsingMessage(bodyOk2Text)
      try {
        machineDao.findMachineIdByNumber(sender, (err, machine) => {
          messageDao.removeMessageByMachineId(machine[0].machineId, (err, res) => {
            elaborateMessage.findAndSaveMessage(sender, messageOkTest, next).then((message) => {
              elaborateMessage.findAndSaveMessage(sender, messageOk2Test, next).then((message) => {

                messageDao.findLastMessagebyMachineId(message.machine, (err, lastMessage) => {
                  //
                  var arrayStartDates = new Array();
                  arrayStartDates.push(moment('2012-12-31').endOf('day'))

                  var arrayEndDates = new Array();
                  arrayEndDates.push(moment('2014-01-01').endOf('day'))
                  computation.computeTotals(false, arrayStartDates, arrayEndDates).then((table) => {
                   // messageDao.removeMessageByMachineId(lastMessage[0].machine, () => {
                      resolve(table)
                   // });

                  })
                });
              });
            })
          })
        });
      } catch (error) {
        reject(Error(error))
      }
    })

    asyncFunction.then((table) => {
      try {
        assert.equal(table.totalDay, 468.25);

        done();
        app.closeServer();
      } catch (err) {
        done(err);
        app.closeServer();
      }
    }, done);


  });
});