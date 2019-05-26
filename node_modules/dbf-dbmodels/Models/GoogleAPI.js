var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoogleSheetsConnectionsScheme = new Schema({
    accessToken: { type: String, required: true },
    company: { type: String, required: true },
    connectionID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, require: true },
    expiryDate: { type: String, required: true },
    refreshToken: { type: String, required: true },
    scope: { type: String, required: true },
    tenant: { type: String, required: true },
    tokenType: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now, require: true },
    userSub: { type: String, required: true }
});

// var GoogleSheetsLogScheme = new Schema({
//     access_token: { type: String, required: true },
//     company: { type: String, required: true },
//     created_at: { type: Date, default: Date.now, require: true },
//     expiry_date: { type: String, required: true },
//     logID: { type: String, required: true },
//     refresh_token: { type: String, required: true },
//     scope: { type: String, required: true },
//     tenant: { type: String, required: true },
//     token_type: { type: String, required: true }
// });

var GMailConnectionsScheme = new Schema({
    accessToken: { type: String, required: true },
    company: { type: String, required: true },
    connectionID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, require: true },
    expiryDate: { type: String, required: true },
    refreshToken: { type: String, required: true },
    scope: { type: String, required: true },
    tenant: { type: String, required: true },
    tokenType: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now, require: true },
    userSub: { type: String, required: true }
});

GoogleSheetsConnectionsScheme.index({ "connectionID": 1}, { "unique": true });
GMailConnectionsScheme.index({ "connectionID": 1}, { "unique": true });
// GoogleSheetsLogScheme.index({ "logID": 1 }, { "unique": true });

module.exports.googlesheetsconnections = mongoose.model('googlesheetsconnections', GoogleSheetsConnectionsScheme);
module.exports.gmailconnections = mongoose.model('gmailconnections', GMailConnectionsScheme);
// module.exports.googlesheetslog = mongoose.model('googlesheetslog', GoogleSheetsLogScheme);