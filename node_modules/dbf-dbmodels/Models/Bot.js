var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var botAppSchema = new Schema({
    company: { type: Number, required: true },
    tenant: { type: Number, required: true },
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    bot_id:{type: ObjectId,ref: 'Bot'},
    app: {type:String,require:true},
    order:{ type: Number, required: true },
    config: {
        Securitykey: { type: String, required: true },
        typing : { type: Boolean , default: false  }
    }

});


var fbChannelSchema = new Schema({
    company: { type: Number, required: true },
    tenant: { type: Number, required: true },
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    page_id: {type:String,require:true,unique: true},
    app_id: {type:String,require:true},
    app_secret: {type:String,require:true},
    page_token: {type:String,require:true},
    verification_token: {type:String,require:true}

});


var slackChannelSchema = new Schema({
    company: { type: Number, required: true },
    tenant: { type: Number, required: true },
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    client_id: {type:String,require:true},
    client_secret: {type:String,require:true},
    verification_token: {type:String,require:true},
    api_token: {type:String,require:true},
    bot_token: {type:String,require:true}

});


var botSchema = new Schema({
    ai:{
        name : {type: String,default: 'default',require:true},
        key: {type: String},
        description: {type: String}
    },
    avatar: String,
    aws : {
        "accessKeyId": {type: String, default: 'n/a',require:true},
        "secretAccessKey": {type: String, default: 'n/a',require:true},
        "region": {type: String, default: 'n/a',require:true}
    },
    bot_language : {type: String, default: "en", require:true},
    bot_type:{type: String},
    channel_facebook: fbChannelSchema,
    channel_slack: slackChannelSchema,
    client_language : {type: String, default: "en", require:true},
    company: { type: Number, required: true },
    created_at: {type:Date,default: Date.now,require:true},
    creation_type:{type: String},
    description: {type: String},
    entities :{ type : Array , "default" : [] },
    facebook_page_id: {type: String},
    multi_language_enabled : {type: Boolean, default: false, require:true},
    name: {type: String, required: true, unique: true},
    slack_client_id: {type: String},
    speech_to_text_enabled : {type: Boolean, default: false, require:true},
    status:{type: Boolean, required: true},
    tenant: { type: Number, required: true },
    updated_at: {type:Date,default: Date.now,require:true},
    screen_name: {type: String, required: true}
});



module.exports.Bot = mongoose.model('Bot', botSchema);
module.exports.FacebookChannel = mongoose.model('FacebookChannel', fbChannelSchema);
module.exports.SlackChannel = mongoose.model('SlackChannel', slackChannelSchema);
module.exports.BotApp = mongoose.model('BotApp', botAppSchema);

botAppSchema.index({ company: 1, tenant: 1, bot_id: 1}, { unique: true });
botSchema.index({ company: 1, tenant: 1, name: 1}, { unique: true });
fbChannelSchema.index({page_id: 1}, { unique: true });

