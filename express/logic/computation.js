var messageDao = require('../dao/messageDao')
var Message = require('../models/message')
var Income = require('../models/income')
var moment = require('moment')
var utils = require('../logic/utils/utils')
var incomeDao = require("../dao/incomeDao")
var machineDao = require("../dao/machineDao")
var dateUtils = require('../logic/utils/dateUtils')
var totals = require('../logic/totals')


exports.computeTotals = function (isTotalSplitPerMachine, arrayStartDates, arrayEndDates) {

    return new Promise((resolve, reject) => {


        try {
            machineDao.findAllMachines((err, machineNumbers) => {

                try {

                    machineNumbers.sort(utils.sort_array_by('machineId', false, function (a) {
                        return parseInt(a);
                    }));
                    //["393334455666", "984353485445", "393338820590"]
                    // prepare all the promises needed to perform the queries
                    var matrixPromises = preparePromises(arrayStartDates, arrayEndDates, machineNumbers)

                    // wait the promises of the query response
                    var queriesCurrentDay = new Array();
                    var queriesYesterDay = new Array();
                    var queriesCurrentWeek = new Array();
                    var queriesCurrentMonth = new Array();
                    for (let k = 0; k < machineNumbers.length; k++) {
                        queriesCurrentDay.push(matrixPromises[k][0]);
                        queriesYesterDay.push(matrixPromises[k][1])
                        queriesCurrentWeek.push(matrixPromises[k][2]);
                        queriesCurrentMonth.push(matrixPromises[k][3]);


                    }


                    var matrixMachineTotalFrequency = utils.Create2DArray(50);


                    Promise.all(queriesCurrentDay).then((messages) => {

                            for (let k = 0; k < messages.length; k++) {
                                matrixMachineTotalFrequency[k][0] = sendTotal(messages[k]);
                            }

                            Promise.all(queriesYesterDay).then((messages) => {

                                    for (let k = 0; k < messages.length; k++) {
                                        matrixMachineTotalFrequency[k][1] = sendTotal(messages[k]);
                                    }

                                    Promise.all(queriesCurrentWeek).then((messages) => {
                                            // calculate the totalCurrentWeek for every machine
                                            for (let k = 0; k < messages.length; k++) {
                                                matrixMachineTotalFrequency[k][2] = sendTotal(messages[k]);
                                            }

                                            Promise.all(queriesCurrentMonth).then((messages) => {
                                                    for (let k = 0; k < messages.length; k++) {
                                                        matrixMachineTotalFrequency[k][3] = sendTotal(messages[k]);
                                                    }

                                                    if (isTotalSplitPerMachine) {
                                                        resolve(totals.getTotalsSplitByMachine(machineNumbers, matrixMachineTotalFrequency));
                                                    } else {
                                                        resolve(totals.getTotals(machineNumbers, matrixMachineTotalFrequency));
                                                    }
                                                },
                                                err => {
                                                    reject(Error(err));
                                                });

                                        },
                                        err => {
                                            reject(Error(err))
                                        });
                                },
                                err => {
                                    reject(Error(err))
                                });
                        },
                        err => {
                            reject(Error(err))
                        });
                } catch (error) {
                    reject(Error(error));
                }
            })
        } catch (error) {
            console.log("error")
            reject(Error(error))
        }
    });

    function preparePromises(arrayStartDates, arrayEndDates, machineNumbers) {
        var matrixPromises = utils.Create2DArray(50);

        for (let i = 0; i < arrayStartDates.length; i++) {
            var startDate = arrayStartDates[i];
            var endDate = arrayEndDates[i];
            for (let k = 0; k < machineNumbers.length; k++) {
                matrixPromises[k][i] = messageDao.findPeriodMessagebyMachineNumber(machineNumbers[k].machineId, startDate, endDate);
                // matrixPromises[k][i] is matrix of promises: k contains the machine index, i the startDate calculation index
            }
        }
        return matrixPromises;
    }

    function sendTotal(messages) {
        var total = 0;
        if (messages) {
            messages.map(doc => {
                if (doc.moneyFromLastSms) {
                    if (doc.moneyFromLastSms.value) {
                        total += doc.moneyFromLastSms;
                    }
                }

            })
        }

        return total;
    }





}


exports.computeAndSaveIncome = function (isTotalSplitPerMachine) {

    return new Promise((resolve, reject) => {
        var arrayStartDates = dateUtils.prepareStartDates();
        this.computeTotals(isTotalSplitPerMachine).then((income) => {
            var incomeArrayToBeSaved = new Array();
            for (var k = 0; k < income.length; k++) {
                var incomeToBesaved = new Income({
                    "machineId": income[k].machineId,
                    "totalCurrentDay": income[k].totalCurrentDay,
                    "totalYesterday": income[k].totalYesterDay,
                    "totalCurrentWeek": income[k].totalCurrentWeek,
                    "totalCurrentMonth": income[k].totalCurrentMonth,
                    "executionDate": new Date(),
                    "weekDay": new Date().getDay(),
                    "year": new Date().getFullYear(),
                    "month": new Date().getMonth(),
                    "dayOfMonth": new Date().getDate()
                });
                incomeArrayToBeSaved.push(incomeDao.saveIncome(incomeToBesaved));
            }
            Promise.all(incomeArrayToBeSaved).then((res) => {
                    resolve(res)
                    console.log("incomes  saved")
                    // res.status(200).json(date)
                },
                (err) => {
                    //res.status(500).json(err);
                    reject(res)
                    console.log(err)
                })
        }, (err) => {
            //res.status(500).json(err);
            reject(res)
            console.log(err);
        })
    })

}
// prepare to write to database