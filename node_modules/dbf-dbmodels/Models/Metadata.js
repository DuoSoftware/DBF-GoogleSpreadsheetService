/**
 * Created by shehantissera on 11/30/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metadataSchema = new Schema({
    aimaps: [{ type: String }],
    airline: [{ type: String }],
    attachments: [{ type: String }],
    bot_id: { type: String, required: true },
    buttoncollections: [{ type: String }],
    cards: [{ type: String }],
    company: {type: Number, required: true},
    context: [{ type: String }],
    conversationalflows: [{ type: String }],
    created_at: { type: Date, default: Date.now, require: true },
    datasources: [{ type: String }],
    entities: [{ type: String }],
    forms: [{ type: String }],
    checkouts: [{ type: String }],
    mediacards: [{ type: String }],
    quickreplies: [{ type: String }],
    receipts: [{ type: String }],
    tenant: {type: Number, required: true},
    updated_at: { type: Date, default: Date.now, require: true }
});

metadataSchema.index({ "company": 1, "tenant": 1, "bot_id": 1}, { "unique": true });

module.exports.metadata = mongoose.model('metadata', metadataSchema);


