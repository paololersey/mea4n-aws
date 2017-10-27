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
            "errorCode": {
                $not: {
                    $type: 10
                }, // $type operator selects documents where value is a BSON type (10 is "null")
                $exists: true
            }

        }).sort('-date').limit(1)
        .exec()
}

exports.findLastMessageParsed = function (machineId) {
    return Message.find({
            "machine": machineId,
            "status": "PA"
        }).sort('-date').limit(1)
        .exec()
}


exports.findLastMessagebyMachineidInErrorCallback = function (machineId, callback) {
    return Message.find({
            "machine": machineId,
            "status": "PA",
            "errorCode": {
                $not: {
                    $type: 10
                }, // $type operator selects documents where value is a BSON type (10 is "null")
                $exists: true
            }

        }).sort('-date').limit(1)
        .exec(callback)
}


/**
 * Method retrieving all the messages within a period
 * @param  {} machineNumber
 * @param  {} startDate
 * @param  {} endDate
 * 
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
 * Method retrieving all the messages with specified filters
 * @param  {} reportSearch
 * @param  {} callback
 */
exports.findPeriodMessagebyFilter = function (reportSearch, callback) {
    // if no filter just simple query
    var query
    let filterCondition = (reportSearch.monthDays && reportSearch.monthDays.length > 0) ||
        (reportSearch.months && reportSearch.months.length > 0) || (reportSearch.years && reportSearch.years.length > 0) ||
        (reportSearch.weekDays && reportSearch.weekDays.length > 0) ||
        (reportSearch.hours && reportSearch.hours.length > 0) || (reportSearch.errors && reportSearch.errors.length > 0) ||
        (reportSearch.machineIds && reportSearch.machineIds.length > 0)

    if (filterCondition) {
        query = {
            date: {
                $lte: reportSearch.dateTo,
                $gte: reportSearch.dateFrom
            },
            status: "PA",
            $and: []
        };
    } else {
        query = {
            date: {
                $lte: reportSearch.dateTo,
                $gte: reportSearch.dateFrom
            },
            status: "PA"
        };
    }


   

    if (reportSearch.monthDays && reportSearch.monthDays.length > 0) {
        query.$and.push({
            dayOfMonth: {
                $in: reportSearch.monthDays
            }
        });
    }
    if (reportSearch.months && reportSearch.months.length > 0) {
        query.$and.push({
            month: {
                $in: reportSearch.months
            }
        });
    }
    if (reportSearch.years && reportSearch.years.length > 0) {
        query.$and.push({
            year: {
                $in: reportSearch.years
            }
        });
    }
    if (reportSearch.weekDays && reportSearch.weekDays.length > 0) {
        query.$and.push({
            weekDay: {
                $in: reportSearch.weekDays
            }
        });
    }
    if (reportSearch.hours && reportSearch.hours.length > 0) {
        query.$and.push({
            hour: {
                $in: reportSearch.hours
            }
        });
    }
    if (reportSearch.errors && reportSearch.errors.length > 0) {
        query.$and.push({
            errorCode: {
                $in: reportSearch.errors
            }
        });
    }

    if (reportSearch.machineIds && reportSearch.machineIds.length > 0) {
        query.$and.push({
            machine: {
                $in: reportSearch.machineIds
            }
        });
    }

    return Message.find(query).sort('-date').exec(callback);

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