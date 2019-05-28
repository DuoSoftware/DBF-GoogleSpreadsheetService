const express = require('express');
const workSpaceManager = require('dbf-workspacemanager');
const permissionManager = require('dbf-permissionmanager');
const splitAction = require('./splitAction');
const restify = require('restify');
const config = require('config');
const bodyParser = require('body-parser');
const corsMiddleware = require('restify-cors-middleware');
const functions = require('./functions');
const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
const MongooseConnection = new require('dbf-dbmodels/MongoConnection');
let connection = new MongooseConnection();

const server = restify.createServer({
    name: "DBF-GoogleSpreadsheetService",
    version: '1.0.0'
}, function (req, res) {

});
const cors = corsMiddleware({
    allowHeaders: ['authorization', 'companyInfo']
})

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: true }));

process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

server.listen(3669, () => {
    console.log('%s listening at %s', server.name, server.url);
});


// function apiRoutes() {
//     const routes = new express.Router();

//     routes.get('/blueprint', splitAction(), permissionManager({
//         permission: 'Forms:R',
//         permissionName: 'FormsService'
//     }), workSpaceManager(), (req, res) => res.send({
//         version: '1'
//     }));

// server.get('/DBF/API/GoogleSpreadsheetService/GetAuthURL', functions.GetAuthURL);
server.get('/DBF/API/GoogleSpreadsheetService/Test', functions.Test);
// server.post('/DBF/API/GoogleSpreadsheetService/GetTokenByCode', functions.GetTokenByCode);
server.post('/DBF/API/GoogleSpreadsheetService/ClearRows', functions.ClearRows);
server.post('/DBF/API/GoogleSpreadsheetService/ClearValues', functions.ClearValues);
server.post('/DBF/API/GoogleSpreadsheetService/CopySheetToAnotherSpreadsheet', functions.CopySheetToAnotherSpreadsheet);
server.post('/DBF/API/GoogleSpreadsheetService/CreateSheet', functions.CreateSheet);
server.post('/DBF/API/GoogleSpreadsheetService/CreateSpreadSheet', functions.CreateSpreadSheet);
server.post('/DBF/API/GoogleSpreadsheetService/DeleteRows', functions.DeleteRows);
server.post('/DBF/API/GoogleSpreadsheetService/DeleteValues', functions.DeleteValues);
server.post('/DBF/API/GoogleSpreadsheetService/FilterData', functions.FilterData);
server.post('/DBF/API/GoogleSpreadsheetService/FilterDataAdvanced', functions.FilterDataAdvanced);
server.post('/DBF/API/GoogleSpreadsheetService/GetData', functions.GetData);
server.post('/DBF/API/GoogleSpreadsheetService/GetDataByRange', functions.GetDataByRange);
server.post('/DBF/API/GoogleSpreadsheetService/GetSheetsListBySpreadsheetID', functions.GetSheetsListBySpreadsheetID);
server.post('/DBF/API/GoogleSpreadsheetService/GetSpreadsheetListByConnectionID', functions.GetSpreadsheetListByConnectionID);
server.post('/DBF/API/GoogleSpreadsheetService/GetSpreadsheetListByToken', functions.GetSpreadsheetListByToken);
server.post('/DBF/API/GoogleSpreadsheetService/UpdateValues', functions.UpdateValues);



