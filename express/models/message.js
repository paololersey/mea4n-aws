var db = require('../../db')
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

var messageSchema = mongoose.Schema({
    machine : {type: String, required: true },
    code: { type: String, required: true },
    money : { type: SchemaTypes.Double },
    iceKg : { type:  SchemaTypes.Double },
    bag: { type: String  },
    date: { type: Date },
    chg: {type: SchemaTypes.Double},
    moneyFromLastSms : { type: SchemaTypes.Double },
    errorCode: { type: String},
    status: {type: String, required: true, minlength: 2, maxlength: 2},
    year: {type: Number, required: true, minlength: 4, maxlength: 4},   
    month: {type: Number, required: true, minlength: 2, maxlength: 2},
    dayOfMonth:  {type: Number, required: true,  maxlength: 2},
    hour: {type: Number, required: true, minlength: 2, maxlength: 2},
    minutes: {type: Number, required: true, minlength: 2, maxlength: 2},
    weekDay:  {type: Number, required: true, minlength: 1, maxlength: 1}
});


messageSchema.methods.doSomething = function (message){
    //.. nop
}

var Message = db.model('Message', messageSchema);

module.exports = Message