var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppScheme = new Schema({
    app_name: {type: String, required: true},
    app_key: {type: String, required: true},
    company: {type: String, required: true},
    app_icon: {type: String, required: true},
    tenant: {type: String},
    type: {type: String, required: true},
    created_at: {type:Date, default: Date.now,require:true},
    updated_at: {type:Date, default: Date.now,require:true},
    Whitelisted_URLS:[{type: String}],
    description: {type: String},
    status:{type: Boolean, required: true, default:true},
    raw_data : {}

});

AppScheme.index({"app_name" : 1, "company": 1, "tenant": 1}, {"unique": true});


module.exports.apps = mongoose.model('apps', AppScheme);
