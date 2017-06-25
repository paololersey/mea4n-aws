var db = require('../../db')
var Income = db.model('Income',  {
    machineId: { type: String, required: true },
    totalCurrentDay : { type: Number, required: true },
    totalYesterday : { type: Number, required: true },
    totalCurrentWeek : { type: Number, required: true },
    totalCurrentMonth : { type: Number, required: true },
    executionDate: { type: Date, required: true },
    weekDay: { type: Number, required: true, minlength: 1, maxlength: 1 },
    year: {type: Number,  minlength: 4, maxlength: 4},   
    month: {type: Number, minlength: 2, maxlength: 2},
    dayOfMonth:  {type: Number,  maxlength: 2},
})

module.exports = Income