var  assert = require('assert'),
  app = require("../app.js"),
  base_url = "http://localhost:3000/",
  parsing = require('../express/logic/parsingMessage')

describe("send a system error message", function () {
  it("parsed a system error message", function (done) {
    var bodyWarningText = {
      "text": `A-SPIN RPT:\r\nSYSTEM ERROR\r\nERROR=B2\r\n2015/07/10 18:51:20`
    }
    var messageWarningTest = parsing.parsingMessage(bodyWarningText)   
    assert.equal(messageWarningTest.errorCode,"B2");
    assert.equal(messageWarningTest.status,"PA");
    assert.equal(messageWarningTest.date.toString(), new Date('2015-07-10T16:51:00.000Z').toString());
    app.closeServer();
    done();

  });
});