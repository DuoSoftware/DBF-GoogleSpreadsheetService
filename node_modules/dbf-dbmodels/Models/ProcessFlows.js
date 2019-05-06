var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkFlowScheme = new Schema({
        company: {type: Number, required: true},
        tenant: {type: Number, required: true},
        ID: {type: String, required: true},
        WFID: {type: String, required: true},
        Name: {type: String, required: true},
        DisplayName: {type: String, required: true},
        comment: {type: String},
        Description: {type: String},
        version: {type: String, required: true},
        DateTime: {type: String, required: true},
        UserName: {type: String, required: true},
        JSONData: {type: String, required: true},
        AuthorDetails: {
            Name: {type: String, required: true},
            Email: {type: String, required: true},
            Domain: {type: String, required: true}
        }
    }


);

var MasterFlowScheme = new Schema({
        company: {type: Number, required: true},
        tenant: {type: Number, required: true},
        ID: {type: String, required: true},
        Name: {type: String, required: true},
        DisplayName: {type: String, required: true},
        Description: {type: String},
        version: {type: Array, required: true},
        DateTime: {type: String, required: true},
        UserName: {type: String, required: true},
        AuthorDetails: {
            Name: {type: String, required: true},
            Email: {type: String, required: true},
            Domain: {type: String, required: true}
        },
        Tags: {type: Array},

    }


);

WorkFlowScheme.index({"ID" : 1, "company": 1, "tenant": 1}, {"unique": true});
MasterFlowScheme.index({"ID" : 1, "company": 1, "tenant": 1}, {"unique": true});


module.exports.workflow = mongoose.model('workflow', WorkFlowScheme);
module.exports.masterflow = mongoose.model('masterflow', MasterFlowScheme);
