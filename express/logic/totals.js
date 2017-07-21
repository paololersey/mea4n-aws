var machineDao = require("../dao/machineDao")
var messageDao = require("../dao/messageDao")

exports.getTotalsSplitByMachine = (machineNumbers, matrixMachineTotalFrequency) => {
    return new Promise((resolve, reject) => {
            var income = new Array();
            var machinePromises = new Array();
            var messagesPromises = new Array();
            var c = new Array();
            var tableRow = {};
            for (let k = 0; k < machineNumbers.length; k++) {
                machinePromises.push(machineDao.findMachineById(machineNumbers[k].machineId))
            }
            Promise.all(machinePromises).then(machines => {
                    for (let k = 0; k < machines.length; k++) {
                        messagesPromises.push(messageDao.findLastMessagebyMachineidInError(machines[k][0].machineId));
                    }
                    Promise.all(messagesPromises).then(messages => {
                            for (let k = 0; k < machines.length; k++) {
                                var lastError = "";
                                if (machines[k][0].status !== 'OK' && messages[k][0]) {
                                    var minutes = messages[k][0].minutes.toString();
                                    if(messages[k][0].minutes.length==1) minutes="0"+messages[k][0].minutes.toString();
                                    var date = messages[k][0].hour + ":" + minutes +","+ messages[k][0].dayOfMonth + "/" + messages[k][0].month + "/" + messages[k][0].year
                                    lastError = messages[k][0].errorCode + "," + date
                                }
                                let totalCurrentDay = matrixMachineTotalFrequency[k][0];
                                if (!totalCurrentDay) totalCurrentDay = 0
                                let totalYesterDay = matrixMachineTotalFrequency[k][1];
                                if (!totalYesterDay) totalYesterDay = 0
                                let totalCurrentWeek = matrixMachineTotalFrequency[k][2];
                                if (!totalCurrentWeek) totalCurrentWeek = 0
                                let totalCurrentMonth = matrixMachineTotalFrequency[k][3];
                                if (!totalCurrentMonth) totalCurrentMonth = 0
                                tableRow = {
                                    'machineId': machines[k][0].machineId,
                                    'totalCurrentDay': totalCurrentDay,
                                    'totalYesterDay': totalYesterDay,
                                    'totalCurrentWeek': totalCurrentWeek,
                                    'totalCurrentMonth': totalCurrentMonth,
                                    'status': machines[k][0].status,
                                    'lastError': lastError
                                }
                                income.push(tableRow)
                            }
                            resolve(income);
                        },
                        err => {
                            reject(Error(err))
                        })
                },
                err => {
                    reject(Error(err))
                })
        },
        err => {
            reject(Error(err))
        })
}

exports.getTotals = (machineNumbers, matrixMachineTotalFrequency) => {
    var totalDay = parseFloat(0);
    var totalYesterday = parseFloat(0);
    var totalWeek = parseFloat(0);
    var totalMonth = parseFloat(0);
    for (let k = 0; k < machineNumbers.length; k++) {
        let machineTotalDay = matrixMachineTotalFrequency[k][0]
        if (!machineTotalDay) machineTotalDay = 0
        let machineTotalYesterday = matrixMachineTotalFrequency[k][1]
        if (!machineTotalYesterday) machineTotalYesterday = 0
        let machineTotalWeek = matrixMachineTotalFrequency[k][2]
        if (!machineTotalWeek) machineTotalWeek = 0
        let machineTotalMonth = matrixMachineTotalFrequency[k][3]
        if (!machineTotalMonth) machineTotalMonth = 0
        totalDay += parseFloat(machineTotalDay);
        totalYesterday += parseFloat(machineTotalYesterday);
        totalWeek += parseFloat(machineTotalWeek);
        totalMonth += parseFloat(machineTotalMonth);
    }
    return {
        "totalDay": Math.round(totalDay),
        "totalYesterday": Math.round(totalYesterday),
        "totalWeek": Math.round(totalWeek),
        "totalMonth": Math.round(totalMonth)
    };
}