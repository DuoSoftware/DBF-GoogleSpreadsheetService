/**
 * Created by vmkde on 6/25/2018.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatHistoryMessagesScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    userInfo : {
        userId : {type:String,require:true },
        userName : {type:String}
    },
    interfaceInformation : {
        interface : {type:String,default: "facebook",require:true },
        originId : {type:String,require:true }
    },
    messageTimestamp: {type:Date,default: Date.now,require:true},
    messageDirection: {type:String,require:true },
    messageType: {type:String,require:true },
    messageResourceId : {type:String},
    message : {type:String},
    enable: { type : Boolean , default : true }

});


//AutomationDnsMapScheme.index({ "company": 1, "tenant": 1, "workflowName": 1}, { "unique": true });

module.exports.chathistorymessages = mongoose.model('chathistorymessages', ChatHistoryMessagesScheme);
