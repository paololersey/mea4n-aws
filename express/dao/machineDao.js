var Machine = require('../models/machine')
var moment = require('moment')
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

exports.insertUpdateMachine = function (machine, insertFlag) {

    if(insertFlag){
        var machine = new Machine({
            startDate: moment(),
            machineId: machine.machineId,
            machineCurrentNumber: machine.machineCurrentNumber,
            status: machine.status,
            connectionStatus: machine.connectionStatus,
            matricola: machine.matricola,
        });
        return new Promise((resolve,reject) => {
            machine.save((err, message) => {
                if (err) {
                    console.log("err" + err)
                }
                resolve(message);
            })
        })
        
    }
    else{
        return Machine.update({
            "machineId": machine.machineId
        }, {
            $set: {
                "status": machine.status,
                "connectionStatus": machine.connectionStatus,
                "machineCurrentNumber": machine.machineCurrentNumber,
                "startDate": machine.startDate,
                "endDate": machine.endDate,
                "matricola": machine.matricola
            }
        }).exec()
    }
    
}