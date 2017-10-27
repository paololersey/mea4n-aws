var Message = require('../models/message')
var utils = require('../logic/utils/utils');
var moment = require('moment')
var errormapDao = require('../dao/errormapDao');

exports.parsingMessage = function (body) {

    var code, money, ice, bag, chg, date, errorCode, status, year, month, dayOfMonth, hour, minutes, weekDay = null;

    // replace /r and /n character with a standard separator
    //let lineSplit = utils.replaceAll(body.line, (/(\r\n|\n|\r)/gm), ';');
    //let line = lineSplit.substring(0, lineSplit.length)
    let lineSplit = body.text.split("\r\n")
    for (let key in lineSplit) {
        var line = lineSplit[key]
        if (line.indexOf('A-SPIN') != -1) {
            code = line.substring(0, line.length - 1)
        }
        // normal operation
        if (line.indexOf('$:') != -1) {
            money = parseFloat(line.substring(line.indexOf('$:') + 2, line.length))
        }
        if (line.indexOf('ICE') != -1) {
            ice = parseFloat(line.substring(line.indexOf('ICE:') + 4, line.indexOf('Kg')))
        }
        if (line.indexOf('BAG') != -1) {
            bag = line.substring(line.indexOf('BAG:') + 4, line.length)
        }
        if (line.indexOf('CHG') != -1) {
            chg = parseFloat(line.substring(line.indexOf('CHG:') + 4, line.length))
        }
        if (line.indexOf('DOOR OPEN') != -1) {
            errorCode = "DO"
        }
        if (line.indexOf('CLEAR') != -1) {
            errorCode = "IC"
        }

        // display eventual error/warning code
        if (line.indexOf('ERROR=') != -1) {
            errorCode = line.substring(line.indexOf('=') + 1, line.indexOf('=') + 3)
        }

        // sms date
        if (line.indexOf('/') != -1 && line.indexOf(':') != -1) {
            date = line.substring(line.indexOf('/') - 4, line.lastIndexOf('/') + 9)
        }
    }

    if (date) {
        
        year = date.substring(0, 4)
        month = date.substring(5, 7)
        dayOfMonth = date.substring(8, 10)
        hour = date.substring(11, 13)
        minutes = date.substring(14, 16)
        var dateObject = new Date(date)
        if (dateObject) weekDay = dateObject.getDay()
        /*if(moment(dateObject).isDST()){
            console.log("date is dst");           
        }*/
        

    }
    if (!date || !code) {
        /* not parseable message */
        status = 'NP'
        errorCode = 'NP'
    }   

    if (!status) status = 'PA' // parsed message


    var message = new Message({
        machine: body.sender,
        code: code,
        money: money,
        iceKg: ice,
        bag: bag,
        date: date,
        chg: chg,
        errorCode: errorCode,
        status: status,
        year: year,
        month: month,
        dayOfMonth: dayOfMonth,
        hour: hour,
        minutes: minutes,
        weekDay: weekDay
    })

    return message;
}