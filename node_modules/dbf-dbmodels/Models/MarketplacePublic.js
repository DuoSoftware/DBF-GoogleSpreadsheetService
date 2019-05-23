var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarketplacePublicActivitiesScheme = new Schema({
    activity_name: {type: String, required: true},
    company: {type: String, required: true},
    created_at: {type:Date, default: Date.now,require:true},
    updated_at: {type:Date, default: Date.now,require:true},
    description: {type: String},
    faq: {type: Array},
    features: {type: Array},
    image: {type: String},
    languages: {type: Array},
    npm_module: {type: String, required: true},
    npm_version: {type: String},
    path: {type: String},
    pricings: {type: Array},
    state: {type: String},
    tags: {type: Array},
    tenant: {type: String, required: true},
    tenant_name: {type: String, required: true},
    type: {type: String},
    variables: {type: Array},
    what_you_get: {type: Array},
    release_notes: {type: Array}
});


var MarketplacePublicIntegrationsScheme = new Schema({
    integration_name: {type: String, required: true},
    company: {type: String, required: true},
    tenant: {type: String, required: true},
    created_at: {type:Date, default: Date.now,require:true},
    updated_at: {type:Date, default: Date.now,require:true},
    description: {type: String},
    faq: {type: Array},
    features: {type: Array},
    image: {type: String},
    languages: {type: Array},
    path: {type: String},
    pricings: {type: Array},
    state: {type: String},
    tags: {type: Array},
    tenant_name: {type: String, required: true},
    type: {type: String},
    variables: {type: Array},
    what_you_get: {type: Array},
    release_notes: {type: Array},
    rawData : {}
});

MarketplacePublicActivitiesScheme.index({"activity_name" : 1}, {"unique": true});
MarketplacePublicIntegrationsScheme.index({"integration_name" : 1}, {"unique": true});


module.exports.marketplacepublicactivities = mongoose.model('marketplacepublicactivities', MarketplacePublicActivitiesScheme);
module.exports.marketplacepublicintegrations = mongoose.model('marketplacepublicintegrations', MarketplacePublicIntegrationsScheme);
