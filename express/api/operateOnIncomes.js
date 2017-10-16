var router = require('express').Router()
var Income = require('../models/income')
var incomeDao = require('../dao/incomeDao')
var compute = require('../logic/computation')
var excelUtils = require('../logic/utils/excelUtils')
var excel = require('../logic/excel')
var moment = require('moment');
var machineDao = require('../dao/machineDao')
var messageDao = require('../dao/messageDao')

// get all messages
router.get('/api/getAllIncomes',
    function (req, res, next) {
        incomeDao.findAllIncomes((err, incomes) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(incomes)
        });
    });

router.get('/api/removeAllIncomes',
    function (req, res, next) {
        incomeDao.removeAllIncomes(err => {
            if (err) return handleError(err);
            res.status(200).json("removed all incomes!")
        });
    });

router.post('/api/computeAndSaveTotalIncome',
    function (req, res, next) {
        compute.computeAndSaveIncome(false).then((result) => {
            res.status(200).json(result);
        }, (err) => {
            res.status(500).json(err);
            console.log(err);
        })
    });

router.post('/api/computeAndSaveIncomePerMachine',
    function (req, res, next) {
        compute.computeAndSaveIncome(true).then((result) => {
            res.status(200).json(result);
        }, (err) => {
            res.status(500).json(err);
            console.log(err);
        })
    });

router.post('/api/getIncomesByFilter',
    function (req, res, next) {

        var reportSearch = {};
        reportSearch.dateFrom = moment(req.body.dateFrom).startOf('day')
        reportSearch.dateTo = moment(req.body.dateTo).endOf('day')
        reportSearch = req.body


        reportSearch.groupByDay = 'N';
        if (req.body.groupByDay) reportSearch.groupByDay = 'Y';

        // find incomes
        if (req.body.groupByDay !== 'N') {
            incomeDao.findIncomesByFilter(reportSearch, (err, incomes) => {
                if (err) {
                    console.log("error found on findIncomesByFilter")
                    return next(err)
                }
                /*incomes.sort(function(a,b) {              
                    return (a.machineId.setMilliseconds(0)).getTime() - new Date(b).getTime() 
                });*/
                machineDao.findAllMachines((err, result) => {
                    if (err) {
                        console.log("error found on findAllMachines")
                        return next(err)
                    }
                    console.log("incomes.length " + incomes.length)
                    console.log("reportSearch.incomes\n " + incomes)
                    var workbook = excel.createExcelIncome(reportSearch, incomes, result.length);
                    workbook.write('ExcelFile.xlsx', res);
                })

                //res.status(200).json(incomes)


            });
        }

        // find messages
        else {
            messageDao.findPeriodMessagebyFilter(reportSearch, (err, messages) => {
                machineDao.findAllMachines((err, result) => {
                    if (err) return next(err)
                    var workbook = excel.createExcelMessages(reportSearch, messages, result.length);
                    workbook.write('ExcelFile.xlsx', res);
                })

            })
        }
    });

module.exports = router