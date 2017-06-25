var Machine = require('../models/machine')

/**
 * Method retrieving a machine
 * @param  {} machineNumber 
 * @param  {} callback
 */
exports.findMachineIdByNumber = function (machineNumber, callback) {
    Machine.find({
        machineCurrentNumber: machineNumber
    }).exec(callback)
}

exports.findMachineById = function (machineId) {
    return Machine.find({
        machineId: machineId
    }).exec()

}

exports.findAllMachines = function (callback) {
    Machine.find().exec(callback)
}

exports.updateMachine = function (machineId, statusNew) {
    return Machine.update({
        "machineId": machineId
    }, {
        $set: {
            "status": statusNew
        }
    }).exec()
}