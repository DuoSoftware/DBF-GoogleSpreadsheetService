var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ActivityUserRegistrySchema = new Schema({
  username: { type: String, required: true },
  activity_name: { type: String, required: true },
  npm_module: { type:String, require:true },
  activity_version: { type:String, require:true },
  installed_at: {type:Date, default: Date.now, require:true},
  connected_workflows: {type: Array, require:true },
  updated_at: { type:Date, default: Date.now, require:true},
});

ActivityUserRegistrySchema.index({"activity_name" : 1}, {"unique": true});


module.exports.ActivityUserRegistry = mongoose.model('ActivityUserRegistry', ActivityUserRegistrySchema);