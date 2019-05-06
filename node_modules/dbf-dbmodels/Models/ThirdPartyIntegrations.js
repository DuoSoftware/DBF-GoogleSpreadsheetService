
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userIntegrationScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    integrationName: {type:String,require:true},
    integrationType: {type:String,require:true},
    integrationData:{type:Object},
    description: {type:String},
    image:{type:String},
    enable: { type : Boolean , default : true }
});




userIntegrationScheme.index({ "company": 1, "tenant": 1, "integrationName": 1}, { "unique": true });


module.exports.userIntegration = mongoose.model('userIntegration', userIntegrationScheme);
