
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userMapSchema = new Schema({
    from_id: { type: String, required: true },
    email: { type: String, required: true },
    bot_id: { type: String, required: true },
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true}

});



module.exports.userMap = mongoose.model('userMap', userMapSchema);


