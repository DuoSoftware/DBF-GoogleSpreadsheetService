var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aiWorkFlowMapScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    ruleName: {type:String,require:true},
    description: {type:String},
    workFlowName: {type:String,require:true},
    botAppId: {type:String,require:true},
    events:{ type : Array , "default" : [] },
    enable: Boolean
});


aiWorkFlowMapScheme.index({ "company": 1, "tenant": 1, "ruleName": 1}, { "unique": true });


module.exports.aiWorkFlowMap = mongoose.model('aiWorkFlowMap', aiWorkFlowMapScheme);