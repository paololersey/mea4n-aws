var router = require('express').Router()
var Machine = require('../models/machine')
var machineDao = require('../dao/machineDao')
var checkMachineBreakdown = require('../logic/checks/checkMachineBreakdown')


// get all Machines
router.get('/api/getMachines',
    function (req, res, next) {
        machineDao.findAllMachines((err, machines) => {
            var arrayMachines = new Array();
            machines.map((machine) => {
                var machineIdName = {};
                machineIdName.id = machine.machineId;
                machineIdName.name = "N-ICE " + machine.machineId;
                arrayMachines.push(machineIdName);
            })
            if (err) {
                return next(err)
            }
            res.status(200).json(arrayMachines)
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

router.get('/api/checkMachineNoComm', function (req, res, next) {
    checkMachineBreakdown.checkMachineBreakdown().then((result) => {
        res.status(200).json(result)
    });
});

module.exports = router