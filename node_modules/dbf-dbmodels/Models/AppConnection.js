var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppConnectionScheme = new Schema({
  company: { type: Number, required: true },
  tenant: { type: Number, required: true },
  id: {type: String, required: true},
  name: {type: String, required: true},
  type: {type: String, required: true},
  appId: {type: String, required: true},
  commonData: {type: Schema.Types.Mixed, default: {}, required: true},
  parameters: {type : Array , default : [], required: true},
  created_at: {type:Date, default: Date.now, require:true},
  updated_at: {type:Date, default: Date.now, require:true},
});

AppConnectionScheme.index({id: 1, company: 1, tenant: 1}, {unique: true});

module.exports.appConnection = mongoose.model('appConnections', AppConnectionScheme);