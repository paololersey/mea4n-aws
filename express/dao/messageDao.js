var Message = require('../models/message')

/**
 * Method saving a certain message document
 * @param  {} message
 */
exports.saveMessage = function (message, next) {
    message.save((err, message) => {
        if (err) {
            console.log("err" + err)
        }
        console.log("message saved")
    })
}


/**
 * Method retrieveng all the messages
 * @param  {} callback
 */
exports.findAllMessages = function (callback) {
    Message.find().sort('-date')
        .exec(callback)
}



/**
 * Method retrieving last message of a machine
 * @param  {} machineNumber 
 * @param  {} callback
 */
exports.findLastMessagebyMachineId = function (machineId, callback) {
    Message.find({
            "machine": machineId,
            "status": "PA",
            "errorCode": null
        }).sort('-date').limit(1)
        .exec(callback)
}

exports.findLastMessagebyMachineidInError = function (machineId) {
    return Message.find({
            "machine": machineId,
            "status": "PA",
            "errorCode" :{
                $not : { $type : 10 },// $type operator selects documents where value is a BSON type (10 is "null")
                $exists : true
            }
           
        }).sort('-date').limit(1)
        .exec()
}

exports.findLastMessagebyMachineidInErrorCallback = function (machineId, callback) {
    return Message.find({
            "machine": machineId,
            "status": "PA",
            "errorCode" :{
                $not : { $type : 10 },// $type operator selects documents where value is a BSON type (10 is "null")
                $exists : true
            }
           
        }).sort('-date').limit(1)
        .exec(callback)
}


/**
 * Method retrieving all the messages of the day specified
 * @param  {} machineNumber
 * @param  {} dateMsg
 * @param  {} callback
 */
exports.findPeriodMessagebyMachineNumber = function (machineNumber, startDate, endDate) {
    return Message.find({
        //  $where  : "this.machine == '"+machineNumber+"'"
        machine: machineNumber,
        date: {
            $lte: endDate,
            $gte: startDate
        },
        status: "PA"
    }).sort('-date').exec() // returns a promise. if .exec() not present, query is parseable with .then();
}


/**
 * Method removing all the messages: use carefully!!
 * @param  {} callback
 */
exports.removeAllMessages = function (callback) {
    Message.remove(callback);
}

exports.removeMessageByMachineId = function (machineId, callback) {
    Message.remove({
        "machine": machineId
    }).exec(callback);
}