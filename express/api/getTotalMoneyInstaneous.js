var router = require('express').Router()
var Message = require('../models/message')
var compute = require('../logic/computation')
var machineStatus = require('../logic/machineStatus')
var moment = require('moment')
var dateUtils = require('../logic/utils/dateUtils')

router.get('/api/getTable',
    (req, res, next) => {
        let dates = dateUtils.prepareDates();
        let isTotalSplitPerMachine = true;
        compute.computeTotals(isTotalSplitPerMachine, dates.arrayStartDates, dates.arrayEndDates).then((results) => {
            //machineStatus.combineStatusWithIncome(incomes).then((results) => {
            res.status(200).json(results);
            /*}, (err) => {
                res.status(500).json(err);
                console.log(err);
            })*/
        }, (err) => {
            res.status(500).json(err);
            console.log(err);
        })
    });

router.get('/api/getTotalMoney',
    (req, res, next) => {
        let dates = dateUtils.prepareDates();
        let isTotalSplitPerMachine = false;
        compute.computeTotals(isTotalSplitPerMachine, dates.arrayStartDates, dates.arrayEndDates).then((totalIncome) => {
            res.status(200).json(totalIncome);
        }, (err) => {
            res.status(500).json(err);
            console.log(err);
        })
    });

module.exports = router