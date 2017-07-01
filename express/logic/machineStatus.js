var machineDao = require('../dao/machineDao')
var messageDao = require('../dao/messageDao')

exports.getMachine = (machineId) => {
    return new Promise((resolve, reject) => {
        machineDao.findMachineById(machineId).then(machine => {
                resolve(machine);
            },
            err => {
                reject(Error(error))
            })
    })
}

exports.updateMachine = (machineId, statusMachine) => {
    return machineDao.updateMachine(machineId, statusMachine)
}

exports.combineStatusWithIncome = (incomes) => {
    return new Promise((resolve, reject) => {
        var machinePromises = new Array();
        var messagesPromises = new Array();
        incomes.map(income => {
            machinePromises.push(this.getMachine(income.machineId));
        })
        Promise.all(machinePromises).then(machines => {
                var arrayResult = new Array();
                console.log(machines)
                machines.map(machine => {
                    messagesPromises.push(messageDao.findLastMessagebyMachineidInError(machine[0].machineId));
                })

                Promise.all(messagesPromises).then((messages) => {
                        incomes.map(income => {
                            messages.map(message => {
                                if (message[0] && (income.machineId === message[0].machine)) {
                                    
                                    machines.map(machine => {
                                        if (income.machineId === machine[0].machineId) {
                                            var date=message[0].dayOfMonth+"/"+message[0].month+"/"+message[0].year+",h."+message[0].hour+ ":" +message[0].minutes
                                            var moneyOrErrorCode=message[0].money
                                            if(message[0].errorCode){
                                                moneyOrErrorCode=message[0].errorCode
                                            }
                                            var lastError = moneyOrErrorCode + "-" + date
                                            if (machine[0].status == 'OK') lastError = ""
                                            arrayResult.push(Object.assign(income, {
                                                "status": machine[0].status,
                                                "lastError": lastError
                                            }));
                                        }
                                    })

                                }
                            })

                        })
                        resolve(arrayResult);
                    },
                    err => {
                        reject(Error(err));
                    })
            },
            err => {
                reject(Error(err));
            })
    })
}