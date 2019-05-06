var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    keyName: {type:String,require:true},
    key: {type:String,require:true},
    description: {type:String},
    enable: { type : Boolean , "default" : true }
});

keyScheme.index({ "company": 1, "tenant": 1, "keyName": 1}, { "unique": true });

module.exports.key = mongoose.model('key', keyScheme);