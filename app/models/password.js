

var mongoose = require('mongoose');
    Schema = mongoose.Schema;


var schemaOptions = {
    toJSON: {
        virtuals: true
    }
};

var PasswordSchema = mongoose.Schema({
    new: 'String',
    confirm: 'String',
    email:'String',
    forgotTime:{ type: Date, default: Date.now },
    changeTime:{ type: Date, default: Date.now },
    valid:{ type:Boolean,default:true }
},schemaOptions);

var Password = mongoose.model('Password', PasswordSchema);
module.exports = Password;
