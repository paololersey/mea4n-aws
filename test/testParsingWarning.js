var  assert = require('assert'),
  app = require("../app.js"),
  base_url = "http://localhost:3000/",
  parsing = require('../express/logic/parsingMessage')

describe("Send a warning message", function () {
  it("parsed a warning message", function (done) {
    var bodyWarningText = {
      "text": `A-SPIN RPT:\r\nWARNING:\r\nERROR=AB\r\n2015/06/29 11:02:23`
    }
    var messageWarningTest = parsing.parsingMessage(bodyWarningText)
    assert.equal(messageWarningTest.errorCode, "AB");
    assert.equal(messageWarningTest.status, "PA");
    assert.equal(messageWarningTest.date.toString(), new Date('2015-06-29T09:02:00.000Z').toString());
    app.closeServer();
    done();

  });
});