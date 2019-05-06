var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WalletScheme = new Schema({
    company: {type: String, required: true},
    tenant: {type: String, required: true},
    created_at: {type: Date, require:true, default: Date.now},
    updated_at: {type: Date, require:true, default: Date.now},
    description: {type: String},
    email: {type: String},
    status:{type: Boolean, required: true},
    tenant_name: {type: String, required: true},
    balance: {type: Number , require:true, default: 0},
    currency: {type: String, require:true, default: "$" },
    hold: {type: Number},
    rawData : {}

});


var TransactionScheme = new Schema({
    transaction_id  : {type: String, required: true},
    company: {type: String, required: true},
    tenant: {type: String, required: true},
    wallet_id : {type: String, required: true},
    created_at: {type: Date, require:true, default: Date.now},
    comment: {type: String},
    amount: {type: Number},
    currency: {type: String, require:true, default: "$" },
    tax: {type: Number},
    type : {type: String, required: true},
    other_fees: {type: Number},
    total : {type: Number},
    rawData : {}

});

WalletScheme.index({"company": 1, "tenant": 1, "tenant_name" : 1}, {"unique": true});

module.exports.wallet = mongoose.model('wallet', WalletScheme);
module.exports.transaction = mongoose.model('transaction', TransactionScheme);

