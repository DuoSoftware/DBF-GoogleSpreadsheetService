var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WorkflowDataScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    workflowName: {type:String,require:true},
    ID: {type:String,require:true},
    workflowData:{},
    enable: { type : Boolean , default : true }
});


WorkflowDataScheme.index({ "company": 1, "tenant": 1, "ID": 1}, { "unique": true });

module.exports.workflowData = mongoose.model('workflowData', WorkflowDataScheme);
