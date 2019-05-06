var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingEngineRulesScheme = new Schema({
    id: {type: String, required: true},
    username: {type: String, required: true},
    expiry: {type: String, required: true},
    data: {type: Object, required: true}

});

RatingEngineRulesScheme.index({"id" : 1, "company": 1, "tenant": 1}, {"unique": true});

module.exports.ratingenginerules = mongoose.model('ratingenginerules', RatingEngineRulesScheme);
