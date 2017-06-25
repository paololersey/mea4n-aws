var Errormap = require('../models/errormap')

/**
 * Method retrieving a Errormap
 * @param  {} ErrormapNumber 
 * @param  {} callback
 */
exports.findErrormapByErrorCode = (errorCode,callback) => {
    Errormap.find({"errorCode":errorCode}).exec(callback)
}

exports.findAllErrormaps = (callback) =>{
    Errormap.find().exec(callback)
}

exports.updateErrormap = function (errorCode, statusNew) {
    return Errormap.update({
        "errorCode": errorCode
    }, {
        $set: {
            "machineStatus": statusNew
        }
    }).exec()
}