var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var demoUserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senderid: {type: String, default:"n/a", required: true}
});



module.exports.DemoUser = mongoose.model('DemoUser', demoUserSchema);

