var machineDao = require("../../dao/machineDao")

exports.checkMachineBreakdown = function () {

    return new Promise((resolve, reject) => {
        try {
            machineDao.findAllMachines((err, machineNumbers) => {
                console.log("find all machines done")
                resolve(machineNumbers)
            })
        }    
        catch(error){
            reject(Error(error))
        }
    })
}


        