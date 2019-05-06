/**
 * Created by Dilshan Kaluarachchi on 09/10/2018.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TenantActivityScheme = new Schema({
    activities: {type: Array},
    company: {type: String, required: true},
    created_at: {type: Date, require:true},
    description: {type: String},
    enable: {type: Boolean, required: true, default: false},
    scope: {type: String, required: true},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    updated_at: {type: Date, require:true}
});

TenantActivityScheme.index({"company": 1, "tenant": 1}, {"unique": true});

module.exports.tenantactivity = mongoose.model('tenantactivity', TenantActivityScheme);
