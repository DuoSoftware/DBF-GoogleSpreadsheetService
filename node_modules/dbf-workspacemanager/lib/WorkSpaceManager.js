/**
 * Created by vmkde on 5/30/2018.
 */



const messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
const workspace = require('dbf-dbmodels/Models/RolesAndGroups').workspace;
const mongoose = require("mongoose");


module.exports.GetWorkspaces = function(req, res){

    console.log("DBF-Services.GetWorkspaces Internal method ");

    let company = parseInt(req.user.company);
    let tenant = parseInt(req.user.tenant);
    let jsonString;

    workspace.find({ company: company, tenant: tenant }, function (err, _forms) {
        if (err) {
            jsonString = messageFormatter.FormatMessage(err, "Forms get failed", false, undefined);
        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Forms get succeeded", true, _forms);
        }
        res.end(jsonString);
    });

};


