var router = require('express').Router()
var Machine = require('../models/machine')
var machineDao = require('../dao/machineDao')
var checkMachineBreakdown = require('../logic/checks/checkMachineBreakdown')


// get all Machines
router.get('/api/getMachines',
    function (req, res, next) {
        machineDao.findAllMachines((err, machines) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(machines)
        });
    });


router.post('/api/statusUpd',
    function (req, res, next) {
        let machineId = req.body.machineId;
        let statusNew = req.body.status;

        machineDao.updateMachine(machineId, statusNew).then(
            (machine) => {           
                res.status(200).json(machine)
            },
            err => {
                res.status(500).json(err)
            });
    })

router.get('/api/checkMachineNoComm',function (req, res, next) {
    checkMachineBreakdown.checkMachineBreakdown().then((result) => {
        res.status(200).json(result)
    });
});

module.exports = router