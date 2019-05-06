const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let userInvitationSchema = new Schema({
  message: String,
  from: { type: String, required: true },
  to: { type: String, required: true },
  status: { type: String, enum: ['pending','accepted','rejected','canceled'], default: 'pending' },
  company: { type: Number, required: true },
  tenant: { type: Number, required: true },
  attributes: { type: Schema.Types.Mixed },
  created_at: { type:Date, default: Date.now, require:true },
  updated_at: { type:Date, default: Date.now, require:true}
});

userInvitationSchema.index({ company: 1, tenant: 1, to: 1}, { unique: true });

let UserInvitation = mongoose.model('UserInvitation', userInvitationSchema);
module.exports.UserInvitation = UserInvitation;