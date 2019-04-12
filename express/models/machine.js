var db = require('../../db')
var mongoose = require('mongoose')

var messageSchema = mongoose.Schema({   
    machineId: { type: String, required: true },
    machineCurrentNumber : {type: String, required: true },
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date},
    status : { type: String},
    connectionStatus : { type: String},
    matricola: { type: String}
});

var Machine = db.model('Machine', messageSchema);

module.exports = Machine