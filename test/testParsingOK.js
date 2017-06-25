var request = require("request"),
  assert = require('assert'),
  app = require("../app.js"),
  base_url = "http://localhost:3000/",
  parsing = require('../express/logic/parsingMessage')

describe("Send a correct message", function () {
  it("parsed a correct message", function (done) {
    var bodyOkText = {
      "text": `A-SPIN RPT:\r\n$:    12.00\r\nICE:   349.44 Kg\r\nBAG:AVAILABLE\r\nCHG:54.00\r\n2017/05/01 03:00:80`
    }
    var messageOkTest = parsing.parsingMessage(bodyOkText)
    assert.equal(messageOkTest.date.toString(), new Date('2017-05-01T01:00:00.000Z').toString());
    assert.equal(messageOkTest.money, parseFloat(12));
    assert.equal(messageOkTest.year, parseFloat(2017));
    assert.equal(messageOkTest.month, parseFloat(5));
    assert.equal(messageOkTest.dayOfMonth, parseFloat(1));
    assert.equal(messageOkTest.hour, parseFloat(3));
    assert.equal(messageOkTest.weekDay, 1);
    app.closeServer();
    done();

  });
});