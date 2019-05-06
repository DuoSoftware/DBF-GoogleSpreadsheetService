var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VerificationScheme = new Schema({
    verificationItem: String,
    type:String,
    verificationCode: String,
    name: String,
    create_date: Date,
    verificationCompleted:Boolean
});

VerificationScheme.methods.VerificationCompleted = function(){
    this.verificationCompleted = true;
    return this.verificationCompleted;
}

module.exports.Verification = mongoose.model('Verification', VerificationScheme);