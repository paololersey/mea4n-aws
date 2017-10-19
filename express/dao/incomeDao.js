var Income = require('../models/income')

exports.saveIncome = function (income) {
    income.save()
}

/**
 * Method retrieveng all the incomes
 * @param  {} callback
 */
exports.findAllIncomes = function (callback) {
    Income.find().sort('-executionDate')
        .exec(callback)
}

/**
 * Method removing all the incomes: use carefully!!
 * @param  {} callback
 */
exports.removeAllIncomes = function (callback) {
    Income.remove(callback);
}

/**
 * Method retrieveng all the incomes
 * @param  {} startDate
 * @param  {} endDate
 * @param  {} callback
 */
exports.findIncomesByFilter = function (reportSearch, callback) {
    var findAllMachines=true;
    if (!reportSearch.dateTo) reportSearch.dateTo = new Date();
    if (!reportSearch.dateFrom) reportSearch.dateFrom = new Date('2017-01-01');
    if (reportSearch.machineIds && reportSearch.machineIds.length>0)  findAllMachines=false;
    if(!findAllMachines){
        Income.find({
            executionDate: {
                $lte: reportSearch.dateTo,
                $gte: reportSearch.dateFrom
            },
            machineId : { $in : reportSearch.machineIds }
        }).sort({
            executionDate: 'asc'
        })
        .exec(callback)
    }
    else{
        
        Income.find({
            executionDate: {
                $lte: reportSearch.dateTo,
                $gte: reportSearch.dateFrom
            }
        }).sort({
            executionDate: 'asc'
        })
        .exec(callback)
    }
    
}