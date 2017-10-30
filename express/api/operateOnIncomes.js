var router = require('express').Router()
var Income = require('../models/income')
var incomeDao = require('../dao/incomeDao')
var compute = require('../logic/computation')
var excelUtils = require('../logic/excel/utils/excelUtils')
var dateUtils = require('../logic/utils/dateUtils')
var utils = require('../logic/utils/utils')
var excelIncome = require('../logic/excel/excelIncome')
var excelMessages = require('../logic/excel/excelMessages')
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
        let reportSearch = Object.assign({}, req.body)
        reportSearch.dateFrom = moment(req.body.dateFrom).startOf('day').add(1, 'hours');
        reportSearch.dateTo = moment(req.body.dateTo).endOf('day').add(1, 'hours');

        if (reportSearch.machineIds && reportSearch.machineIds.length > 0) {
            reportSearch.machineIds = utils.integerSort(reportSearch.machineIds);
        }


        reportSearch.groupByDay = 'N';
        if (req.body.groupByDay) reportSearch.groupByDay = 'Y';

        // find incomes
        if (reportSearch.groupByDay !== 'N') {
            incomeDao.findIncomesByFilter(reportSearch, (err, incomes) => {
                if (err) return next(err)           
                machineDao.findAllMachines((err, result) => {
                    if (err) {
                        return next(err)
                    }
                    var diffDays = dateUtils.getDiffDaysFromDates(reportSearch.dateFrom, reportSearch.dateTo);
                    var workbook = excelIncome.createExcelIncome(reportSearch, incomes, result.length, diffDays);
                    workbook.write('ExcelFile.xlsx', res);
                })

                //res.status(200).json(incomes)


            });
        }

        // find messages
        else {
            messageDao.findPeriodMessagebyFilter(reportSearch, (err, messages) => {
                if (err) return next(err) 
                machineDao.findAllMachines((err, result) => {
                    if (err) return next(err)
                    var workbook = excelMessages.createExcelMessages(reportSearch, messages, result.length);
                    workbook.write('ExcelFile.xlsx', res);
                })

            })
        }
    });

module.exports = router