/**
 * Created by Dilshan Kaluarachchi on 09/10/2018.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TenantActivityRecordsScheme = new Schema({
    activity_name: {type: String, required: true},
    company: {type: String, required: true},
    created_at: {type:Date, require:true},
    description: {type: String},
    faq: {type: Array},
    features: {type: Array},
    image: {type: String},
    languages: {type: Array},
    npm_module: {type: String, required: true},
    npm_version: {type: String},
    path: {type: String},
    pricings: {type: Array},
    reviewed: {type: Boolean, required: true, default: false},
    state: {type: String},
    tags: {type: Array},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    type: {type: String},
    updated_at: {type:Date, require:true},
    variables: {type: Array},
    what_you_get: {type: Array}
});

var TenantActivityVariablesScheme = new Schema({
    activity_name: {type: String, required: true},
    advance: {type: String},
    api_method: {type: String},
    category: {type: String},
    company: {type: String, required: true},
    control: {type: String},
    created_at: {type:Date, require:true},
    data_type: {type: String},
    display_name: {type: String, required: true},
    group: {type: String},
    key: {type: String, required: true},
    priority: {type: String},
    placeholder: {type: String},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    type: {type: String},
    updated_at: {type:Date, require:true},
    value: {type: String},
    value_list: {type: Array}
});

var TenantActivityLanguagesScheme = new Schema({
    activity_name: {type: String, required: true},
    company: {type: String, required: true},
    created_at: {type:Date, require:true},
    language: {type: String, required: true},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    updated_at: {type:Date, require:true}
});

var TenantActivityTagsScheme = new Schema({
    activity_name: {type: String, required: true},
    company: {type: String, required: true},
    created_at: {type:Date, require:true},
    tag: {type: String, required: true},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    updated_at: {type:Date, require:true}
});

var TenantActivityPricingScheme = new Schema({
    activity_name: {type: String, required: true},
    bill_cycle: {type: String},
    company: {type: String, required: true},
    created_at: {type:Date, require:true},
    price: {type: String, default: 0},
    pricing_fts: {type: Array},
    pricing_name: {type: String, required: true},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    updated_at: {type:Date, require:true}
});


module.exports.tenantactivityrecords = mongoose.model('tenantactivityrecords', TenantActivityRecordsScheme);
module.exports.tenantactivityvariables = mongoose.model('tenantactivityvariables', TenantActivityVariablesScheme);
module.exports.tenantactivitylanguages = mongoose.model('tenantactivitylanguages', TenantActivityLanguagesScheme);
module.exports.tenantactivitytags = mongoose.model('tenantactivitytags', TenantActivityTagsScheme);
module.exports.tenantactivitypricings = mongoose.model('tenantactivitypricings', TenantActivityPricingScheme);

TenantActivityRecordsScheme.index({"activity_name": 1, "npm_module": 1}, {"unique": true});