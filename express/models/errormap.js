var db = require('../../db')
var mongoose = require('mongoose')

var messageSchema = mongoose.Schema({   
    errorCode: { type: String, required: true, minlength: 2, maxlength: 2},
    machineStatus : {type: String, required: true },
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date},
    description : { type: String,  maxlength: 255},
    emailToSend: { type: String,  required: true, minlength: 1, maxlength: 1}
});

var Errormap = db.model('Errormap', messageSchema);

module.exports = Errormap