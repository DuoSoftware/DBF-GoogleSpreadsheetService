/**
 * Created by Dilshan on 5/16/2019.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConnectionsScheme = new Schema({
    company: {type: String, required: true},
    connectionID: {type: String, required: true},
    connectionType: {type: String},
    created_at: {type:Date,default: Date.now},
    description: {type: String},
    enable: {type: Boolean},
    image: {type: String},
    integrationConnections: {type: Array},
    integrationData: {type: Array},
    integrationName: {type: String},
    state: {type: String},
    tenant: {type: String, required: true},
    updated_at: {type:Date,default: Date.now},
    userSub: {type: String, required: true},
});


ConnectionsScheme.index({"connectionID": 1}, { "unique": true });

module.exports.connections = mongoose.model('connections', ConnectionsScheme);
