var CronJob = require('cron').CronJob;
var router = require('express').Router()
var incomeDao = require('../dao/incomeDao')
var Income = require('../models/income')
var compute = require('../logic/computation')
var checkMachineBreakdown = require('../logic/checks/checkMachineBreakdown')
var moment = require('moment')

//router.get('/api/startCron',
//(req, res, next) => {

var job = new CronJob('50 23 * * *', function () {
  // console.log('running a task every minute');
  //computation.computeTotals();
  var isTotalSplitPerMachine = true;
  compute.computeAndSaveIncome(isTotalSplitPerMachine).then((result) => {
   // NOP - store cron to database
  }, (err) => {
    console.log(err);
  })

}, function () {
  /* This function is executed when the job stops */
  console.log("job  has stopped")
}, true, 'Europe/Rome');

var job = new CronJob('20 * * * *', function () {
  // console.log('running a task every minute');
  //computation.computeTotals();
  checkMachineBreakdown.checkMachineBreakdown().then((result) => {
   // NOP - store cron to database
  }, (err) => {
    console.log(err);
  })

}, function () {
  /* This function is executed when the job stops */
  console.log("job  has stopped")
}, true, 'Europe/Rome');

module.exports = router