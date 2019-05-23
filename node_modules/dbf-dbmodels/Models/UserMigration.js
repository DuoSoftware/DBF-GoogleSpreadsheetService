
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMigrationScheme = new Schema({
    oldCompany: {type: Number, required: true},
    oldTenant: {type: Number, required: true, default: 1},
    newCompany: {type: Number, required: true},
    newTenant: {type: Number, required: true},
    migrationStatus  :  { type : Boolean , default : false },
    userName: {type:String,require:true},
    email: {type:String,require:true}
});



module.exports.usermigration = mongoose.model('usermigration', userMigrationScheme);


