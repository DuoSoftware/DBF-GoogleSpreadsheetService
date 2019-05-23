/**
 * Created by Dilshan on 5/16/2019.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConnectionsScheme = new Schema({
    company: {type: Number, required: true},
    connectionID: {type: String, required: true},
    connectionType: {type: String, required: true},
    created_at: {type:Date,default: Date.now},
    description: {type: String},
    enable: {type: Boolean, required: true},
    image: {type: String},
    integrationConnections: {type: Array},
    integrationData: {type: Array},
    integrationName: {type: String, required: true},
    state: {type: String, required: true},
    tenant: {type: Number, required: true},
    updated_at: {type:Date,default: Date.now},
    userSub: {type: String, required: true},
});


ConnectionsScheme.index({"connectionID": 1}, { "unique": true });

module.exports.connections = mongoose.model('connections', ConnectionsScheme);
