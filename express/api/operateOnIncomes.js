var router = require('express').Router()
var Income = require('../models/income')
var incomeDao = require('../dao/incomeDao')
var compute = require('../logic/computation')
var excelUtils = require('../logic/utils/excelUtils')
var excel = require('../logic/excel')

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
        reportSearch.dateFrom = req.body.dateFrom;
        reportSearch.dateTo = req.body.dateTo;
        reportSearch.machineIds = req.body.machineIds

        if (req.body.groupByDay) {
            incomeDao.findIncomesByFilter(reportSearch, (err, incomes) => {
                if (err) {
                    return next(err)
                }
                var workbook = excelUtils.configureExcel();
                workbook = excel.createExcel(workbook, incomes);
                //res.status(200).json(incomes)
                workbook.write('ExcelFile.xlsx', res);

            });
        }

    });

module.exports = router