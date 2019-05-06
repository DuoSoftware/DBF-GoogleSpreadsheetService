/**
 * Created by vmkde on 5/30/2018.
 */



const messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
const project = require('dbf-dbmodels/Models/RolesAndGroups').project;


module.exports.GerProjects = function(req, res){

    console.log("DBF-Services.GetProjects Internal method ");

    let company = parseInt(req.user.company);
    let tenant = parseInt(req.user.tenant);
    let jsonString;

    project.find({ company: company, tenant: tenant }, function (err, _projects) {
        if (err) {
            jsonString = messageFormatter.FormatMessage(err, "Forms get failed", false, undefined);
        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Forms get succeeded", true, _projects);
        }
        res.end(jsonString);
    });

};


