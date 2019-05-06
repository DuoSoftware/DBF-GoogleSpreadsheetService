/**
 * Created by vmkde on 6/20/2018.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverRegistryScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    deploymentType : {type:String,require:true},
    deployedWorkFlows:{type:Array},
    serverName: {type:String},
    environment : {type:String,require:true},
    remoteUrl: {type:String,require:true},
    enable: { type : Boolean , default : true }


});


serverRegistryScheme.index({ "company": 1, "tenant": 1, "serverName": 1}, { "unique": true });

module.exports.serverregistry = mongoose.model('serverregistry', serverRegistryScheme);


