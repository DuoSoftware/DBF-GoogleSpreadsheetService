var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eCSRecordSchema = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    displayName: {type: String, required: true},
    download: {type: String, default:''},
    deploytype: {type: String, default:''},
    name:{type: String, default:''},
    port:{type: Number, required: true},
    wfname:{type: String, required: true},
    created_at: {type:Date},
    updated_at: {type:Date}
});

module.exports.ECSRecord = mongoose.model('ECSRecord', eCSRecordSchema);