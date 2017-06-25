var request = require("request"),
  assert = require('assert'),
  app = require("../app.js"),
  base_url = "http://localhost:3000/",
  parsing = require('../express/logic/parsingMessage')

describe("Send not parseable message", function () {
  it("parsed a correct message", function (done) {
    var bodyOkText = {
      "text": `HELLO`
    }
    var messageNotParseableTest = parsing.parsingMessage(bodyOkText)

    assert.equal(messageNotParseableTest.date, null);
    assert.equal(messageNotParseableTest.status, 'NP');
    assert.equal(messageNotParseableTest.errorCode, 'NP');
   
    app.closeServer();
    done();

  });
});