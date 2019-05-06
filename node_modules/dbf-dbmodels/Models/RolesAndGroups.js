/**
 * Created by vmkde on 5/30/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rolesScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    roleName: {type:String,require:true},
    permissions:[{
        permissionDisplayName : {type: String},
        permissionName: {type: String},
        permissionObj: {}
    }],
    description: {type:String},
    enable: { type : Boolean , default : true }
});


var groupScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    groupName: {type:String,require:true},
    roles:[{
        roleName: {type:String,require:true},
        roleId: {type:String,require:true},
    }],
    users:[{
        email: {type: String},
        userId: {type: String}
    }],
    description: {type:String},
    enable: { type : Boolean , default : true }
});

var workSpaceScheme = new Schema({
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    workSpaceName: {type:String,require:true},
    billingAccount : {type:String,require:true},
    projects:[{
        projectName: {type:String,require:true},
        projectId: {type:String,require:true},
    }],
    users:[{
        email: {type: String},
        userId: {type: String}
    }],
    description: {type:String},
    enable: { type : Boolean , default : true }
});

var projectScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    projectName: {type:String,require:true},
    workSpaceName: {type:String,require:true},
    workSpaceId: {type:String,require:true},
    users:[{
        email: {type: String},
        userId: {type: String}
    }],
    description: {type:String},
    enable: { type : Boolean , default : true }
});


var userScheme = new Schema({
    company: {type: Number, required: true},
    tenant: {type: Number, required: true},
    created_at: {type:Date,default: Date.now,require:true},
    updated_at: {type:Date,default: Date.now,require:true},
    userName: {type:String,require:true},
    botUser:{ type : Boolean , default : false},
    bot:  {type:String},
    botUniqueId:  {type:String},
    email: {type:String,require:true},
    roles: [{
        workspaceId: {type: String},
        projectId: {type: String},
        roleId: {type: String},
        roleName: {type: String}
    }],
    groups:  [{
        workspaceId: {type: String},
        projectId: {type: String},
        groupId: {type: String},
        groupName: {type: String}
    }],
    workspaces:  [{
        workspaceId: {type: String},
        workspaceName: {type: String}
    }],
    projects:  [{
        workspaceId: {type: String},
        projectId: {type: String},
        projectName: {type: String}
    }],
    description: {type:String},
    settings: {},
    enable: { type : Boolean , default : true }
});




rolesScheme.index({ "company": 1, "tenant": 1, "roleName": 1}, { "unique": true });
groupScheme.index({ "company": 1, "tenant": 1, "groupName": 1}, { "unique": true });
userScheme.index({ "email": 1}, { "unique": true });
projectScheme.index({ "company": 1, "tenant": 1}, { "unique": true });
workSpaceScheme.index({ "tenant": 1}, { "unique": true });




module.exports.roles = mongoose.model('roles', rolesScheme);
module.exports.groups = mongoose.model('groups', groupScheme);
module.exports.user = mongoose.model('user', userScheme);
module.exports.workspace = mongoose.model('workspace', workSpaceScheme);
module.exports.project = mongoose.model('project', projectScheme);

