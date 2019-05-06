var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoogleSheetsScheme = new Schema({
    access_token: { type: String, required: true },
    company: { type: String, required: true },
    created_at: { type: Date, default: Date.now, require: true },
    expiry_date: { type: String, required: true },
    refresh_token: { type: String, required: true },
    scope: { type: String, required: true },
    tenant: { type: String, required: true },
    token_type: { type: String, required: true },
    updated_at: { type: Date, default: Date.now, require: true }
});

var GoogleSheetsLogScheme = new Schema({
    access_token: { type: String, required: true },
    company: { type: String, required: true },
    created_at: { type: Date, default: Date.now, require: true },
    expiry_date: { type: String, required: true },
    logID: { type: String, required: true },
    refresh_token: { type: String, required: true },
    scope: { type: String, required: true },
    tenant: { type: String, required: true },
    token_type: { type: String, required: true }
});

GoogleSheetsScheme.index({ "company": 1, "tenant": 1 }, { "unique": true });
GoogleSheetsLogScheme.index({ "logID": 1 }, { "unique": true });

module.exports.googlesheets = mongoose.model('googlesheets', GoogleSheetsScheme);
module.exports.googlesheetslog = mongoose.model('googlesheetslog', GoogleSheetsLogScheme);