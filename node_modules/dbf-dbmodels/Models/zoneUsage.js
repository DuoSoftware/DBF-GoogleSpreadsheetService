var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZoneUsageScheme = new Schema({

    created_at: {type:Date, default: Date.now,require:true},
    updated_at: {type:Date, default: Date.now,require:true},
    value : {
        discarded: {type: Number, default: 0},
        processing: {type: Number, default: 0},
        received: {type: Number, default: 0},
        sent : {type: Number, default: 0},
        requests: {type: Number, default: 0},
        responses: {
            "1xx" : {type: Number, default: 0},
            "2xx": {type: Number, default: 0},
            "3xx": {type: Number, default: 0},
            "4xx": {type: Number, default: 0},
            "5xx": {type: Number, default: 0},
            "total": {type: Number, default: 0}
        }
    },
    zone : {type: String, required: true}

});


ZoneUsageScheme.index({"zone" : 1}, {"unique": true});

module.exports.zoneUsage = mongoose.model('zoneUsage', ZoneUsageScheme);
