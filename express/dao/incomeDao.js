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
