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

var aiWorkFlowMapScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    ruleName: {type:String,require:true},
    description: {type:String},
    workFlowName: {type:String,require:true},
    botAppId: {type:String,require:true},
    events:{ type : Array , "default" : [] },
    enable: Boolean
});


aiWorkFlowMapScheme.index({ "company": 1, "tenant": 1, "ruleName": 1}, { "unique": true });


module.exports.aiWorkFlowMap = mongoose.model('aiWorkFlowMap', aiWorkFlowMapScheme);

var AppScheme = new Schema({
    app_name: {type: String, required: true},
    app_key: {type: String, required: true},
    company: {type: String, required: true},
    app_icon: {type: String, required: true},
    tenant: {type: String},
    type: {type: String, required: true},
    created_at: {type:Date, default: Date.now,require:true},
    updated_at: {type:Date, default: Date.now,require:true},
    Whitelisted_URLS:[{type: String}],
    description: {type: String},
    status:{type: Boolean, required: true, default:true},
    raw_data : {}

});

AppScheme.index({"app_name" : 1, "company": 1, "tenant": 1}, {"unique": true});


module.exports.apps = mongoose.model('apps', AppScheme);


var AutomationDnsMapScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    workflowName: {type:String,require:true},
    deploymentType : {type:String,require:true},
    serverName: {type:String},
    environment : {type:String,require:true},
    remoteUrl: {type:String,require:true},
    proxyUrl: {type:String,require:true},
    user: {type:String,require:true},
    apiKey:{type:String},
    enable: { type : Boolean , default : true }


});


AutomationDnsMapScheme.index({ "company": 1, "tenant": 1, "workflowName": 1}, { "unique": true });

module.exports.dnsmap = mongoose.model('dnsmap', AutomationDnsMapScheme);


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

var ChatHistoryScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    userInfo : {
        userId : {type:String,require:true },
        userName : {type:String}
    },
    interfaceInformation : {
        interface : {type:String,default: "facebook",require:true },
        originId : {type:String,require:true }
    },
    // history:[{
    //     timestamp: {type:Date,default: Date.now,require:true},
    //     direction: {type:String,require:true },
    //     message: {
    //         type : {type:String,require:true },
    //         resourceId : {type:String},
    //         message : {type:String}
    //     }
    // }],
    history:{type:Array},
    enable: { type : Boolean , default : true }

});


//AutomationDnsMapScheme.index({ "company": 1, "tenant": 1, "workflowName": 1}, { "unique": true });

module.exports.chathistory = mongoose.model('chathistory', ChatHistoryScheme);

var ChatHistoryMessagesScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    userInfo : {
        userId : {type:String,require:true },
        userName : {type:String}
    },
    interfaceInformation : {
        interface : {type:String,default: "facebook",require:true },
        originId : {type:String,require:true }
    },
    messageTimestamp: {type:Date,default: Date.now,require:true},
    messageDirection: {type:String,require:true },
    messageType: {type:String,require:true },
    messageResourceId : {type:String},
    message : {type:String},
    enable: { type : Boolean , default : true }

});


//AutomationDnsMapScheme.index({ "company": 1, "tenant": 1, "workflowName": 1}, { "unique": true });

module.exports.chathistorymessages = mongoose.model('chathistorymessages', ChatHistoryMessagesScheme);