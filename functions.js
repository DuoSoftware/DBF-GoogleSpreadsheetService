/**
 * Created by Dilshan on 27/03/2019.
 */
const messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');
const mongoose = require("mongoose");
const config = require('config');
const async = require('async');
const request = require('request');
const googlesheets = require('dbf-dbmodels/Models/GoogleSheets').googlesheets;
const googlesheetslog = require('dbf-dbmodels/Models/GoogleSheets').googlesheetslog;
const connections = require('dbf-dbmodels/Models/GoogleSheets').connections;
const uuidv1 = require('uuid/v1');
const JSONC = require('circular-json');

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var GoogleSpreadsheet = require('google-spreadsheet');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.


// const CREDENTIAL_FILE_PATH = './credentials.json';


module.exports.GetAuthURL = async function (req, res, next) {

    console.log("\n==================== GetAuthURL Internal method ====================\n");

    // Load client secrets from a local file.
    // fs.readFile(CREDENTIAL_FILE_PATH, (err, content) => {
    // if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.

    // let credentials = JSON.parse(content);

    // const { client_secret, client_id, redirect_uris } = credentials.installed;
    // const oAuth2Client = new google.auth.OAuth2(
    //     client_id, client_secret, redirect_uris[0]);

    const oAuth2Client = new google.auth.OAuth2(
        config.GoogleSheets.client_id, config.GoogleSheets.client_secret, config.GoogleSheets.redirect_uris);

    // const oAuth2Client = new google.auth.OAuth2(
    //     "535313902488-9qn6t0lfm0j2cvr6aihg71oaair4o06o.apps.googleusercontent.com", "UiGY9gNi3eVhJqoxydZ5PRnS", "https://googlesheetsdev.plus.smoothflow.io/DBF/API/5/GoogleSpreadsheetService/Test");

    // const oAuth2Client = new google.auth.OAuth2(
    //     "535313902488-e6u9tb709cfdl824cl14hh4icag9ip32.apps.googleusercontent.com", "BxuRRx0Bok7LOgxhypOBMyTW", "https://googlesheetsdev.plus.smoothflow.io/DBF/API/5/GoogleSpreadsheetService/Test");



    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url: ', authUrl);

    jsonString = messageFormatter.FormatMessage(undefined, "URL successfully created", true, authUrl);
    res.end(jsonString);
    // });
}

module.exports.GetTokenByCode = async function (req, res, next) {

    console.log("\n==================== GetTokenByCode Internal method ====================\n");

    console.log(req);

    // var company = parseInt(req.user.company);
    // var tenant = parseInt(req.user.tenant);
    var company = "company";
    var tenant = "tenant";
    var userSub = "userSub";

    // Load client secrets from a local file.
    // fs.readFile(CREDENTIAL_FILE_PATH, (err, content) => {
    // if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.

    // let credentials = JSON.parse(content);

    // const { client_secret, client_id, redirect_uris } = credentials.installed;
    // const oAuth2Client = new google.auth.OAuth2(
    //     client_id, client_secret, redirect_uris[0]);

    const oAuth2Client = new google.auth.OAuth2(
        config.GoogleSheets.client_id, config.GoogleSheets.client_secret, config.GoogleSheets.redirect_uris);


    oAuth2Client.getToken(req.body.code, async (err, token) => {
        if (err) {
            console.log('Error while trying to retrieve access token: ' + JSONC.stringify(err.response));
            jsonString = messageFormatter.FormatMessage(err, "Get token from google sheets has failed", false, undefined);
            res.end(jsonString);
        }
        else {
            console.log("Token received: " + token);
            oAuth2Client.setCredentials(token);

            // Store the token to disk for later program executions
            // fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            //     if (err) return console.error(err);
            //     console.log('Token stored to', TOKEN_PATH);
            // });
            // callback(oAuth2Client);

            // saveTokenData(company, token.expiry_date, token.refresh_token, token.scope, tenant, token.access_token, token.token_type);
            await saveTokenData(company, token.expiry_date, token.refresh_token, token.scope, tenant, token.access_token, token.token_type, userSub)
                .then(async function (tokenResult) {
                    console.log("Token data save successful: " + tokenResult);

                    await saveTokenLogData(company, token.expiry_date, token.refresh_token, token.scope, tenant, token.access_token, token.token_type).catch(function (tokenError) {
                        console.log(tokenError);
                    });

                    res.end(tokenResult);
                    return;
                })
                .catch(function (error) {
                    console.log("Token data save has failed: " + error);

                    res.end(error);
                    return;
                });
        }
    });
    // });
}

module.exports.Test = async function (req, res, next) {

    console.log("\n==================== Test Internal method ====================\n");

    console.log(req);

    console.log("=========================================================");

    console.log(req.url);
    console.log("=========================================================");

    console.log(req.params);
    console.log("=========================================================");


    console.log(req.body);

    // fs.readFile(CREDENTIAL_FILE_PATH, async (err, content) => {
    // if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Sheets API.

    // let credentials = JSON.parse(content);

    // const { client_secret, client_id, redirect_uris } = credentials.installed;
    // const oAuth2Client = new google.auth.OAuth2(
    //     client_id, client_secret, redirect_uris[0]);

    // const oAuth2Client = new google.auth.OAuth2(
    //     config.GoogleSheets.client_id, config.GoogleSheets.client_secret, config.GoogleSheets.redirect_uris);

    // await getTokenDataByCompanyTenant("company", "tenant")
    //     .then(function (tokenResult) {
    //         console.log(tokenResult);

    //         let tokenData = {
    //             access_token: tokenResult.access_token,
    //             expiry_date: tokenResult.expiry_date,
    //             refresh_token: tokenResult.refresh_token,
    //             scope: tokenResult.scope,
    //             token_type: tokenResult.token_type
    //         };
    //         oAuth2Client.setCredentials(tokenData);
    //         listMajors(oAuth2Client);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         res.end(error);
    //         return;
    //     });


    // // Check if we have previously stored a token.
    // fs.readFile(TOKEN_PATH, (err, token) => {
    //     // if (err) return getNewToken(oAuth2Client, callback);

    //     // console.log(JSON.parse(token)); 
    //     // Object {access_token: "ya29.Glv7BmEUgy7ZFXGEjpYBKI6xc5O5ZIZu2DDTeB5TEpX-9…", refresh_token: "1/yGbcTSI6B2rDGaWVVWG3MsjEomUCCBew3e5XFEuKie8", scope: "https://www.googleapis.com/auth/spreadsheets.reado…", token_type: "Bearer", expiry_date: 1556620505539}


    //     oAuth2Client.setCredentials(JSON.parse(token));
    //     listMajors(oAuth2Client);
    //     // callback(oAuth2Client);
    // });

    // oAuth2Client.setCredentials(JSON.parse(token));


    // });
}

module.exports.CreateSpreadSheet = async function (req, res) {

    console.log("\n==================== CreateSpreadSheet Internal method ====================\n");
    // console.log(req);

    let accessToken = "";

    if (typeof req.body === 'string') {
        let body = JSON.parse(req.body);
        accessToken = body.accessToken;
    }
    else {
        accessToken = req.body.accessToken;
    }

    if (accessToken === "") {
        console.log("AccessToken is empty")
        jsonString = messageFormatter.FormatMessage(undefined, "Please make sure the access token is entered", false, undefined);
        res.end(jsonString);
    }

    await getOAuth2ClientByAccessToken(accessToken)
        .then(function (auth) {

            const sheets = google.sheets({ version: 'v4', auth });

            const resource = {
                properties: {
                    title: req.body.title
                }
            };

            sheets.spreadsheets.create({
                resource,
                fields: 'spreadsheetId',
            }, (err, spreadsheet) => {
                if (err) {
                    // Handle error.
                    console.log(err);
                    jsonString = messageFormatter.FormatMessage(undefined, "Spreadsheet creation has failed", false, undefined);
                    res.end(jsonString);
                } else {
                    console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
                    jsonString = messageFormatter.FormatMessage(undefined, "Spreadsheet successfully created", true, spreadsheet.data.spreadsheetId);
                    res.end(jsonString);
                }
            });

        })
        .catch(function (error) {
            console.log(error);
            res.end(error);
            return;
        })
}

module.exports.CreateSheet = async function (req, res) {

    console.log("\n==================== CreateSheet Internal method ====================\n");
    // console.log(req);

    let body;
    let accessToken = "";
    let spreadsheetID = "";
    let sheetName = "";
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }

    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (body.sheetName !== undefined && body.sheetName !== '') {
        sheetName = body.sheetName;
    } else {
        console.log("ISSUE: SheetName not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet name details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {

                const sheets = google.sheets({ version: 'v4', auth });

                const request = {
                    // The ID of the spreadsheet
                    "spreadsheetId": spreadsheetID,
                    "resource": {

                        "requests": [
                            {
                                "addSheet": {
                                    "properties": {
                                        "title": sheetName
                                    }
                                }
                            }
                        ]
                    }
                }

                sheets.spreadsheets.batchUpdate(request, (err, response) => {
                    if (err) {
                        // Handle error.
                        console.log(err);
                        jsonString = messageFormatter.FormatMessage(err, "Sheet creation has failed", false, undefined);
                        res.end(jsonString);
                    } else {
                        console.log(response);
                        // console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
                        jsonString = messageFormatter.FormatMessage(undefined, "Spreadsheet successfully created", true, spreadsheet.data.spreadsheetId);
                        res.end(jsonString);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.end(error);
                return;
            })
    }
}


module.exports.CopySheetToAnotherSpreadsheet = async function (req, res) {
    //TO TEST
    console.log("\n==================== CopySheetToAnotherSpreadsheet Internal method ====================\n");
    // console.log(req);

    let body;
    let accessToken = "";
    let spreadsheetID = "";
    let sheetID = "";
    let destinationSpreadsheetID = "";
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }

    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (body.sheetID !== undefined && body.sheetID !== '') {
        sheetID = body.sheetID;
    } else {
        console.log("ISSUE: sheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (body.destinationSpreadsheetID !== undefined && body.destinationSpreadsheetID !== '') {
        destinationSpreadsheetID = body.destinationSpreadsheetID;
    } else {
        console.log("ISSUE: destinationSpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the destination Spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {

                var sheets = google.sheets('v4');

                var request = {
                    spreadsheetId: spreadsheetID,
                    sheetId: sheetID,
                    resource: {
                        destinationSpreadsheetId: destinationSpreadsheetID
                    },
                    auth: auth,
                };

                sheets.spreadsheets.sheets.copyTo(request, function (err, response) {
                    if (err) {
                        // Handle error.
                        console.log('Error occurred in copying the sheet: ' + err);
                        jsonString = messageFormatter.FormatMessage(undefined, "Copying the sheet has failed", false, undefined);
                        res.end(jsonString);
                    } else {
                        console.log(response);
                        console.log('Successfully copied the sheet');
                        jsonString = messageFormatter.FormatMessage(undefined, "Sheet successfully copied", true, undefined);
                        res.end(jsonString);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.end(error);
                return;
            })
    }
}

module.exports.UpdateValues = async function (req, res) {

    console.log("\n==================== UpdateValues Internal method ====================\n");

    // console.log("===== request body ======");
    // console.log(req.body);

    let body;
    let accessToken = "";
    let addOption = "append"; // overwrite or append
    let endingCell = "";
    let majorDimension = "ROWS";
    let spreadsheetID = "";
    let sheetName = "";
    let startingCell = "";
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }

    if (body.addOption !== undefined && body.addOption !== '') {
        addOption = body.addOption;
    } else {
        console.log("ISSUE: AddOption not entered!");
    }

    if (body.endingCell !== undefined && body.endingCell !== '') {
        endingCell = body.endingCell;
    } else {
        console.log("ISSUE: EndingCell not entered!");
    }

    if (body.majorDimension !== undefined && body.majorDimension !== '') {
        majorDimension = body.majorDimension;
    } else {
        console.log("ISSUE: MajorDimension not entered!");
    }

    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (body.sheetName !== undefined && body.sheetName !== '') {
        sheetName = body.sheetName;
    } else {
        console.log("ISSUE: SheetName not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet name details", false, undefined);
        res.end(jsonString);
    }

    if (body.startingCell !== undefined && body.startingCell !== '') {
        startingCell = body.startingCell;
    } else {
        console.log("ISSUE: StartingCell not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the starting cell details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        addOption = addOption.toLowerCase();

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {

                const sheets = google.sheets({ version: 'v4', auth });

                let changeRange = sheetName + '!' + startingCell + ':' + endingCell;

                if (endingCell == "") {
                    changeRange = sheetName + '!' + startingCell;
                }

                if (addOption === 'overwrite') {
                    sheets.spreadsheets.values.update({
                        // spreadsheetId: req.body.spreadsheetID,
                        spreadsheetId: spreadsheetID,
                        range: changeRange,
                        valueInputOption: 'RAW',
                        resource: {
                            'range': changeRange,
                            'majorDimension': majorDimension,
                            'values': req.body.values
                        }
                    }, (err, result) => {
                        if (err) {
                            // Handle error.
                            console.log('Error occurred in updating cells: ' + err);
                            jsonString = messageFormatter.FormatMessage(undefined, "Cell update has failed", false, undefined);
                            res.end(jsonString);
                        } else {
                            console.log(result);
                            console.log('Successfully updated the cells');
                            jsonString = messageFormatter.FormatMessage(undefined, "Cells successfully updated", true, undefined);
                            res.end(jsonString);
                        }
                    });
                }
                else {
                    sheets.spreadsheets.values.append({
                        // spreadsheetId: req.body.spreadsheetID,
                        spreadsheetId: spreadsheetID,
                        range: changeRange,
                        valueInputOption: 'RAW',
                        resource: {
                            'range': changeRange,
                            'majorDimension': majorDimension,
                            'values': req.body.values
                        }
                    }, (err, result) => {
                        if (err) {
                            // Handle error.
                            console.log('Error occurred in updating cells: ' + err);
                            jsonString = messageFormatter.FormatMessage(undefined, "Cell update has failed", false, undefined);
                            res.end(jsonString);
                        } else {
                            // console.log(result);
                            console.log('Successfully updated the cells');
                            // console.log('%d cells updated.', result.data,updates.updatedCells);
                            jsonString = messageFormatter.FormatMessage(undefined, "Cells successfully updated", true, undefined);
                            res.end(jsonString);
                        }
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                res.end(error);
                return;
            })
    }
}

module.exports.ClearValues = async function (req, res) {

    console.log("\n==================== ClearValues Internal method ====================\n");

    // console.log("===== request body ======");
    // console.log(req.body);

    let body;
    let accessToken = "";
    let endingCell = "";
    let spreadsheetID = "";
    let sheetName = "";
    let startingCell = "";
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }

    if (body.endingCell !== undefined && body.endingCell !== '') {
        endingCell = body.endingCell;
    } else {
        console.log("ISSUE: EndingCell not entered!");
    }

    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (body.sheetName !== undefined && body.sheetName !== '') {
        sheetName = body.sheetName;
    } else {
        console.log("ISSUE: SheetName not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet name details", false, undefined);
        res.end(jsonString);
    }

    if (body.startingCell !== undefined && body.startingCell !== '') {
        startingCell = body.startingCell;
    } else {
        console.log("ISSUE: StartingCell not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the starting cell details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {

                const sheets = google.sheets({ version: 'v4', auth });

                let changeRange = sheetName + '!' + startingCell + ':' + endingCell;

                if (endingCell == "") {
                    changeRange = sheetName + '!' + startingCell;
                }

                sheets.spreadsheets.values.clear({
                    // spreadsheetId: req.body.spreadsheetID,
                    spreadsheetId: spreadsheetID,
                    range: changeRange,
                    resource: {
                        'range': changeRange
                    }
                }, (err, result) => {
                    if (err) {
                        // Handle error.
                        console.log('Error occurred in clearing cells: ' + err);
                        jsonString = messageFormatter.FormatMessage(undefined, "Cell clear has failed", false, undefined);
                        res.end(jsonString);
                    } else {
                        // console.log(result);
                        console.log('Successfully cleared the cells');
                        // console.log('%d cells updated.', result.data,updates.updatedCells);
                        jsonString = messageFormatter.FormatMessage(undefined, "Cells successfully cleared", true, undefined);
                        res.end(jsonString);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.end(error);
                return;
            })
    }
}

module.exports.DeleteValues = async function (req, res) {
    //TODO
    console.log("\n==================== DeleteValues Internal method ====================\n");

    // console.log("===== request body ======");
    // console.log(req.body);

    let body;
    let accessToken = "";
    let addOption = "append"; // overwrite or append
    let endingCell = "";
    let majorDimension = "ROWS";
    let spreadsheetID = "";
    let sheetName = "";
    let startingCell = "";
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }

    if (body.endingCell !== undefined && body.endingCell !== '') {
        endingCell = body.endingCell;
    } else {
        console.log("ISSUE: EndingCell not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the ending cell details", false, undefined);
        res.end(jsonString);
    }

    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }


    if (body.sheetName !== undefined && body.sheetName !== '') {
        sheetName = body.sheetName;
    } else {
        console.log("ISSUE: SheetName not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet name details", false, undefined);
        res.end(jsonString);
    }

    if (body.startingCell !== undefined && body.startingCell !== '') {
        startingCell = body.startingCell;
    } else {
        console.log("ISSUE: StartingCell not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the starting cell details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        addOption = addOption.toLowerCase();

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {

                const sheets = google.sheets({ version: 'v4', auth });

                let changeRange = sheetName + '!' + startingCell + ':' + endingCell;

                sheets.spreadsheets.values.clear({
                    // spreadsheetId: req.body.spreadsheetID,
                    spreadsheetId: spreadsheetID,
                    range: changeRange,
                    resource: {
                        'range': changeRange
                    }
                }, (err, result) => {
                    if (err) {
                        // Handle error.
                        console.log('Error occurred in updating cells: ' + err);
                        jsonString = messageFormatter.FormatMessage(undefined, "Cell update has failed", false, undefined);
                        res.end(jsonString);
                    } else {
                        // console.log(result);
                        console.log('Successfully updated the cells');
                        // console.log('%d cells updated.', result.data,updates.updatedCells);
                        jsonString = messageFormatter.FormatMessage(undefined, "Cells successfully updated", true, undefined);
                        res.end(jsonString);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.end(error);
                return;
            })
    }
}

module.exports.DeleteRows = async function (req, res) {

    console.log("\n==================== DeleteRows Internal method ====================\n");

    // console.log("===== request body ======");
    // console.log(req.body);

    let body;
    let accessToken = "";
    let spreadsheetID = "";
    let sheetID = "";
    let startingRowIndex = "";
    let endingRowIndex = "";
    let deleteByRowIndexOrRowNumber = "index";  // "index" OR "number"
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }


    //////////// deleting row index //////////////////////
    if (body.deleteByRowIndexOrRowNumber !== undefined && body.deleteByRowIndexOrRowNumber !== '') {
        deleteByRowIndexOrRowNumber = body.deleteByRowIndexOrRowNumber;
    } else {
        console.log("ISSUE: DeleteByRowIndexOrRowNumber not entered!");
    }

    if (deleteByRowIndexOrRowNumber === "number") {
        if (body.startingRowNumber !== undefined && body.startingRowNumber !== '') {
            startingRowIndex = parseInt(body.startingRowNumber) - 1;
        } else {
            console.log("ISSUE: StartingRowNumber not entered!");
            fieldValidationDone = false;
            jsonString = messageFormatter.FormatMessage(undefined, "Please enter the starting row number details", false, undefined);
            res.end(jsonString);
        }

        if (body.endingRowNumber !== undefined && body.endingRowNumber !== '') {
            endingRowNumber = body.endingRowNumber - 1;
        } else {
            console.log("ISSUE: EndingRowNumber not entered!");
            endingRowIndex = parseInt(startingRowIndex) + 1;
        }
    }
    else {
        if (body.startingRowIndex !== undefined && body.startingRowIndex !== '') {
            startingRowIndex = parseInt(body.startingRowIndex);
        } else {
            console.log("ISSUE: StartingRowIndex not entered!");
            fieldValidationDone = false;
            jsonString = messageFormatter.FormatMessage(undefined, "Please enter the starting row index details", false, undefined);
            res.end(jsonString);
        }

        if (body.endingRowIndex !== undefined && body.endingRowIndex !== '') {
            endingRowIndex = body.endingRowIndex;
        } else {
            console.log("ISSUE: EndingRowIndex not entered!");
            endingRowIndex = parseInt(startingRowIndex) + 1;
        }
    }
    //////////////////////////////////////////////////////////////////


    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }


    if (body.sheetID !== undefined && body.sheetID !== '') {
        sheetID = body.sheetID;
    } else {
        console.log("ISSUE: SheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet ID details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {

                const sheets = google.sheets({ version: 'v4', auth });

                const request = {
                    // The ID of the spreadsheet
                    "spreadsheetId": spreadsheetID,
                    "resource": {
                        "requests": [
                            {
                                "deleteDimension": {
                                    "range": {
                                        "sheetId": sheetID,
                                        "dimension": "ROWS",
                                        "startIndex": startingRowIndex,
                                        "endIndex": endingRowIndex
                                    }
                                }
                            }
                        ]
                    }
                }
                sheets.spreadsheets.batchUpdate(request, (err, response) => {
                    if (err) {
                        // Handle error.
                        console.log(err);
                        jsonString = messageFormatter.FormatMessage(err, "Row deletion has failed", false, undefined);
                        res.end(jsonString);
                    } else {
                        console.log(response);
                        // console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
                        jsonString = messageFormatter.FormatMessage(undefined, "Rows successfully deleted", true, undefined);
                        res.end(jsonString);
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
                res.end(error);
                return;
            })
    }
}

// function workingWithCells(key, res) {
//     var doc = new GoogleSpreadsheet('1hgz0fZ5IG25MCFk7tr_76epmnU8FgV9hI0lYXvjtn9U');
//     var sheet;

//     // see notes below for authentication instructions!
//     var creds = require('./credentials.json');
//     // OR, if you cannot save the file locally (like on heroku)
//     // var creds_json = {
//     //   client_email: 'sachitra.k@duosoftware.com',
//     //   private_key: key
//     // }

//     doc.useServiceAccountAuth(creds, res);


//     doc.getInfo(function (err, info) {
//         console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
//         sheet = info.worksheets[0];
//         console.log('sheet 1: ' + sheet.title + ' ' + sheet.rowCount + 'x' + sheet.colCount);

//         sheet.getCells({
//             'min-row': 1,
//             'max-row': 5,
//             'return-empty': true
//         }, function (err, cells) {
//             var cell = cells[0];
//             console.log('Cell R' + cell.row + 'C' + cell.col + ' = ' + cell.value);

//             // cells have a value, numericValue, and formula
//             cell.value == '1'
//             cell.numericValue == 1;
//             cell.formula == '=ROW()';

//             // updating `value` is "smart" and generally handles things for you
//             cell.value = 123;
//             cell.value = '=A1+B2'
//             cell.save(); //async

//             // bulk updates make it easy to update many cells at once
//             cells[0].value = 1;
//             cells[1].value = 2;
//             cells[2].formula = '=A1+B1';
//             sheet.bulkUpdateCells(cells); //async

//         });
//     });


// }

module.exports.GetSheetDataBySpreadsheetID = async function (req, res) {
//TODO
    console.log("\n==================== GetSheetDataBySpreadsheetID Internal method ====================\n");

    await getOAuth2ClientByAccessToken(req.body.accessToken)
        .then(function (auth) {
            // Do NOT rename "auth" field to anyother name, it will stop working
            const sheets = google.sheets({ version: 'v4', auth });

            // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
            // range: 'Class Data!A1:C',

            sheets.spreadsheets.get({
                spreadsheetId: req.body.spreadsheetID,
                fields: "sheets.properties"
            }, (err, result) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    res.end('The API returned an error: ' + err);
                    return;
                }
                const rows = result.data.values;
                if (rows.length) {
                    console.log('Name, Major:');
                    // Print columns A and E, which correspond to indices 0 and 4.
                    rows.map((row) => {
                        console.log(`${row[0]}`);
                    });
                    res.end(rows);
                } else {
                    console.log('No data found.');
                }
            });

        })
        .catch(function (error) {
            console.log(error);
            res.end(error);
            return;
        })

}

module.exports.GetData = async function (req, res) {

    console.log("\n==================== GetData Internal method ====================\n");

    await getOAuth2ClientByAccessToken(req.body.accessToken)
        .then(function (auth) {
            // Do NOT rename "auth" field to anyother name, it will stop working
            const sheets = google.sheets({ version: 'v4', auth });

            // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
            // range: 'Class Data!A1:C',

            sheets.spreadsheets.values.get({
                spreadsheetId: req.body.spreadsheetID,
                range: req.body.sheetName + '!' + req.body.range,
            }, (err, result) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    res.end('The API returned an error: ' + err);
                    return;
                }
                const rows = result.data.values;
                if (rows.length) {
                    console.log('Name, Major:');
                    // Print columns A and E, which correspond to indices 0 and 4.
                    rows.map((row) => {
                        console.log(`${row[0]}`);
                    });
                    res.end(rows);
                } else {
                    console.log('No data found.');
                }
            });

        })
        .catch(function (error) {
            console.log(error);
            res.end(error);
            return;
        })


    // fs.readFile(CREDENTIAL_FILE_PATH, async (err, content) => {
    //     if (err) return console.log('Error loading client secret file:', err);
    //     // Authorize a client with credentials, then call the Google Sheets API.

    //     let credentials = JSON.parse(content);

    //     const { client_secret, client_id, redirect_uris } = credentials.installed;
    //     const oAuth2Client = new google.auth.OAuth2(
    //         client_id, client_secret, redirect_uris[0]);


    //     await getTokenData("company", "tenant")
    //         .then(function (tokenResult) {
    //             console.log(tokenResult);

    //             let tokenData = {
    //                 access_token: tokenResult.access_token,
    //                 expiry_date: tokenResult.expiry_date,
    //                 refresh_token: tokenResult.refresh_token,
    //                 scope: tokenResult.scope,
    //                 token_type: tokenResult.token_type
    //             };
    //             oAuth2Client.setCredentials(tokenData);

    //             const sheets = google.sheets({ version: 'v4', auth });

    //             sheets.spreadsheets.values.get({
    //                 spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    //                 range: 'Class Data!A1:C',
    //             }, (err, res) => {
    //                 if (err) return console.log('The API returned an error: ' + err);
    //                 const rows = res.data.values;
    //                 if (rows.length) {
    //                     console.log('Name, Major:');
    //                     // Print columns A and E, which correspond to indices 0 and 4.
    //                     rows.map((row) => {
    //                         console.log(`${row[0]}`);
    //                     });
    //                 } else {
    //                     console.log('No data found.');
    //                 }
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             res.end(error);
    //             return;
    //         });
    // });
}

module.exports.GetDataByRange = async function (req, res) {

    console.log("\n==================== GetDataByRange Internal method ====================\n");

    let body;
    let accessToken = "";
    let endingCell = "";
    let spreadsheetID = "";
    let sheetName = "";
    let startingCell = "";
    let fieldValidationDone = true;

    if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
    }
    else {
        body = req.body;
    }

    if (body.accessToken !== undefined && body.accessToken !== '') {
        accessToken = body.accessToken;
    } else {
        console.log("ISSUE: AccessToken not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the access token details", false, undefined);
        res.end(jsonString);
    }

    if (body.endingCell !== undefined && body.endingCell !== '') {
        endingCell = body.endingCell;
    } else {
        console.log("ISSUE: EndingCell not entered!");
    }

    if (body.spreadsheetID !== undefined && body.spreadsheetID !== '') {
        spreadsheetID = body.spreadsheetID;
    } else {
        console.log("ISSUE: SpreadsheetID not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the spreadsheet ID details", false, undefined);
        res.end(jsonString);
    }


    if (body.sheetName !== undefined && body.sheetName !== '') {
        sheetName = body.sheetName;
    } else {
        console.log("ISSUE: SheetName not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the sheet name details", false, undefined);
        res.end(jsonString);
    }

    if (body.startingCell !== undefined && body.startingCell !== '') {
        startingCell = body.startingCell;
    } else {
        console.log("ISSUE: StartingCell not entered!");
        fieldValidationDone = false;
        jsonString = messageFormatter.FormatMessage(undefined, "Please enter the starting cell details", false, undefined);
        res.end(jsonString);
    }

    if (fieldValidationDone !== false) {

        await getOAuth2ClientByAccessToken(accessToken)
            .then(function (auth) {
                // Do NOT rename "auth" field to anyother name, it will stop working
                // const sheets = google.sheets({ version: 'v4', auth });
                var sheets = google.sheets('v4');

                // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
                // range: 'Class Data!A1:C',

                let cellRange = sheetName + '!' + startingCell + ':' + endingCell;

                if (endingCell == "") {
                    cellRange = sheetName + '!' + startingCell;
                }

                sheets.spreadsheets.values.get({
                    spreadsheetId: spreadsheetID,
                    range: cellRange,
                    majorDimension: "ROWS",
                    auth: auth
                }, function (err, result) {
                    if (err) {
                        console.log("The API returned an error: " + err);
                        jsonString = messageFormatter.FormatMessage(undefined, "The API returned an error: " + err, false, undefined);
                        res.end(jsonString);
                    }
                    else {
                        console.log(result.data);

                        let sheetValues = [];

                        if (result.data.values !== undefined && result.data.values !== '') {
                            sheetValues = result.data.values;
                        }

                        jsonString = messageFormatter.FormatMessage(undefined, "Values retrieved successfully", true, sheetValues);
                        res.end(jsonString);
                    }
                });
            })
            .catch(function (error) {
                console.log("An exception was thrown: " + error);
                jsonString = messageFormatter.FormatMessage(undefined, "An exception was thrown: " + error, false, undefined);
                res.end(jsonString);
            })
    }
}

function listMajors(auth2) {
    console.log(auth2);
    const sheets = google.sheets({ version: 'v4', auth2 });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A1:C',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(`${row[0]}`);
            });
        } else {
            console.log('No data found.');
        }
    });
}

module.exports.GetFormsByID = async function (req, res) {

    console.log("\n====================GetFormsByID Internal method====================\n");

    // let Schema = mongoose.Schema;
    // let ObjectId = Schema.ObjectId;

    var company = parseInt(req.user.company);
    var tenant = parseInt(req.user.tenant);

    console.log(company);
    console.log(tenant);

    let tokenDataResult = await getTokenData(company, tenant).catch(function (getError) {
        console.log(getError);
        res.end(getError);
        return;
    });

    console.log(tokenDataResult.length);
    if (tokenDataResult.length > 0) {
        if (tokenDataResult[0] !== undefined && tokenDataResult[0] !== null) {
            // console.log(tokenDataResult[0]);
            if (tokenDataResult[0].token !== undefined && tokenDataResult[0].token !== null) {
                // console.log(tokenDataResult[0].token);

                let formsData = await GetFormsByID(tokenDataResult[0].token, req.params.formID).catch(function (getFormsError) {
                    console.log(getFormsError);
                    res.end(getFormsError);
                    return;
                });
                res.end(formsData);
                return;
            }
        }
    }
}

let getTokenFromTypeForm = (code) => {
    return new Promise((resolve, reject) => {
        let uri = "https://api.typeform.com/oauth/token";

        uri = encodeURI(uri);

        request({
            method: "POST",
            url: uri,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'grant_type=authorization_code&code=' + code + '&client_id=' + tFKeys.clientID + '&client_secret=' + tFKeys.clientSecret + '&redirect_uri=' + tFKeys.redirectURI
        }, function (_error, _response, datax) {
            if (_error) {
                console.log("An error occured while getting token data: " + _error);
                jsonString = messageFormatter.FormatMessage(_error, "An error occured while getting token data", false, undefined);
                reject(jsonString);
            } else if (datax) {
                try {
                    let datay = JSON.parse(datax);
                    if (datay.access_token === undefined) {
                        if (datay.description === "Access denied") {
                            console.log("Access denied for the given code");
                            jsonString = messageFormatter.FormatMessage(undefined, "Access denied for the given code. If the code is generated with offline scope, the app should be allowed to create limited time tokens", false, undefined);
                            reject(jsonString);

                        }
                    }
                    resolve(datay);
                } catch (error) {
                    console.log("An error occured while decoding token data: " + error);
                    jsonString = messageFormatter.FormatMessage(error, "An error occured while decoding token data", false, undefined);
                    reject(jsonString);
                }
            } else {
                console.log("Did not receive any data from type form");
                jsonString = messageFormatter.FormatMessage(undefined, "Did not receive any data from type form", false, undefined);
                reject(jsonString);
            }
        });
    });
}


let getTokenFromTypeFormByRefreshT = (code) => {
    return new Promise((resolve, reject) => {
        let uri = "https://api.typeform.com/oauth/token";

        uri = encodeURI(uri);

        request({
            method: "POST",
            url: uri,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 'grant_type=refresh_token&refresh_token=<refresh_token>&client_id=<client_id>&client_secret=<client_secret>&scope=forms:read'
        }, function (_error, _response, datax) {

            if (_error) {
                console.log(_error);
                // reject("An error occured while detecting the text");
            } else if (datax) {
                console.log(datax);
                try {
                    let datay = JSON.parse(datax);
                    console.log(datay.access_token);
                    resolve(datay.access_token);
                } catch (error) {
                    // reject("An error occured while detecting the text");
                }

            } else {
                reject("An error occured while detecting the text");
            }
        });
    });
}

let saveTokenData = (company, expiry_date, refresh_token, scope, tenant, access_token, token_type, userSub) => {
    return new Promise((resolve, reject) => {
        let tokenData = {
            access_token: access_token,
            company: company,
            expiry_date: expiry_date,
            refresh_token: refresh_token,
            scope: scope,
            tenant: tenant,
            token_type: token_type,
            userSub: userSub
        };

        googlesheets.findOneAndUpdate({
            'company': company,
            'tenant': tenant
        }, tokenData, {
                upsert: true
            }, function (err, _tokenDataResult) {
                if (err) {
                    console.log("Error occurred while saving token data: " + err);
                    jsonString = messageFormatter.FormatMessage(err, "Error occurred while saving token data", false, undefined);
                    reject(jsonString);
                } else {
                    console.log("Successfully retrieved and saved token data");
                    jsonString = messageFormatter.FormatMessage(undefined, "Successfully retrieved and saved token data", true, undefined);
                    resolve(jsonString);
                }
            });

        // NEW WAY

        // company: {type: Number, required: true},
        // connectionID: {type: String, required: true},
        // connectionType: {type: String, required: true},
        // created_at: {type:Date,default: Date.now},
        // description: {type: String},
        // enable: {type: Boolean, required: true},
        // image: {type: String},
        // integrationConnections: {type: Array},
        // integrationData: {type: Array},
        // integrationName: {type: String, required: true},
        // state: {type: String, required: true},
        // tenant: {type: Number, required: true},
        // updated_at: {type:Date,default: Date.now},
        // userSub: {type: String, required: true},


        // connections.findOneAndUpdate({
        //     'connectionID': connectionID
        // }, tokenData, {
        //         upsert: true
        //     }, function (err, _tokenDataResult) {
        //         if (err) {
        //             console.log("Error occurred while saving token data: " + err);
        //             jsonString = messageFormatter.FormatMessage(err, "Error occurred while saving token data", false, undefined);
        //             reject(jsonString);
        //         } else {
        //             console.log("Successfully retrieved and saved token data");
        //             jsonString = messageFormatter.FormatMessage(undefined, "Successfully retrieved and saved token data", true, undefined);
        //             resolve(jsonString);
        //         }
        //     });
    });
}

let saveTokenLogData = (company, expiry_date, refresh_token, scope, tenant, access_token, token_type) => {
    return new Promise((resolve, reject) => {

        let logID = uuidv1();

        let tokenLogData = {
            access_token: access_token,
            company: company,
            expiry_date: expiry_date,
            logID: logID,
            refresh_token: refresh_token,
            scope: scope,
            tenant: tenant,
            token_type: token_type
        };

        googlesheetslog.findOneAndUpdate({
            'logID': logID
        }, tokenLogData, {
                upsert: true
            }, function (err, _tokenLogDataResult) {
                if (err) {
                    console.log("Error occurred while saving token log data: " + err);
                    jsonString = messageFormatter.FormatMessage(err, "Error occurred while saving token log data", false, undefined);
                    reject(jsonString);
                }
                console.log("Successfully saved token log data");
                jsonString = messageFormatter.FormatMessage(undefined, "Successfully saved token log data", true, undefined);
                resolve(jsonString);
            });
    });
}

let getTokenDataByCompanyTenant = (company, tenant) => {
    return new Promise((resolve, reject) => {

        // getTokenData("1", "51");

        googlesheets.findOne({
            'company': company,
            'tenant': tenant
        }, function (err, _tokenResult) {
            // console.log(_recordResult);
            if (err) {
                console.log("Error occurred while getting token data: " + err);
                jsonString = messageFormatter.FormatMessage(err, "Error occurred while getting token data", false, undefined);
                reject(jsonString);
            }
            resolve(_tokenResult);
        });
    });
}

let getTokenDataByAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {

        // getTokenData("1", "51");

        googlesheets.findOne({
            'access_token': accessToken
        }, function (err, _tokenResult) {
            console.log(_tokenResult);
            if (err) {
                console.log("Error occurred while getting token data: " + err);
                jsonString = messageFormatter.FormatMessage(err, "Error occurred while getting token data", false, undefined);
                reject(jsonString);
            }
            resolve(_tokenResult);
        });
    });
}

let getOAuth2ClientByAccessToken = (accessToken) => {
    return new Promise(async (resolve, reject) => {

        // fs.readFile(CREDENTIAL_FILE_PATH, async (err, content) => {
        // if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.

        // let credentials = JSON.parse(content);

        // const { client_secret, client_id, redirect_uris } = credentials.installed;
        // const oAuth2Client = new google.auth.OAuth2(
        //     client_id, client_secret, redirect_uris[0]);

        const oAuth2Client = new google.auth.OAuth2(
            config.GoogleSheets.client_id, config.GoogleSheets.client_secret, config.GoogleSheets.redirect_uris);

        // const oAuth2Client = new google.auth.OAuth2(
        //     "535313902488-e6u9tb709cfdl824cl14hh4icag9ip32.apps.googleusercontent.com", "BxuRRx0Bok7LOgxhypOBMyTW", "urn:ietf:wg:oauth:2.0:oob");


        await getTokenDataByAccessToken(accessToken)
            .then(function (tokenResult) {

                console.log("\n========= tokenResult =========");
                console.log(tokenResult);

                let tokenData = {
                    access_token: tokenResult.access_token,
                    expiry_date: tokenResult.expiry_date,
                    refresh_token: tokenResult.refresh_token,
                    scope: tokenResult.scope,
                    token_type: tokenResult.token_type
                };
                oAuth2Client.setCredentials(tokenData);
                resolve(oAuth2Client);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
                return;
            });
        // });
    });
}

let getOAuth2Client = (company, tenant) => {
    return new Promise(async (resolve, reject) => {

        // fs.readFile(CREDENTIAL_FILE_PATH, async (err, content) => {
        // if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.

        // let credentials = JSON.parse(content);

        // const { client_secret, client_id, redirect_uris } = credentials.installed;
        // const oAuth2Client = new google.auth.OAuth2(
        //     client_id, client_secret, redirect_uris[0]);

        const oAuth2Client = new google.auth.OAuth2(
            config.GoogleSheets.client_id, config.GoogleSheets.client_secret, config.GoogleSheets.redirect_uris);


        await getTokenDataByCompanyTenant(company, tenant)
            .then(function (tokenResult) {
                console.log(tokenResult);

                let tokenData = {
                    access_token: tokenResult.access_token,
                    expiry_date: tokenResult.expiry_date,
                    refresh_token: tokenResult.refresh_token,
                    scope: tokenResult.scope,
                    token_type: tokenResult.token_type
                };
                oAuth2Client.setCredentials(tokenData);
                resolve(oAuth2Client);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
                return;
            });
        // });
    });
}

let GetForms = (token) => {
    return new Promise((resolve, reject) => {
        let uri = "https://api.typeform.com/forms";

        uri = encodeURI(uri);

        request({
            method: "GET",
            url: uri,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }, function (_error, _response) {
            console.log(_response.body);

            if (_error) {
                console.log("Error occurred while getting forms data: " + _error);
                jsonString = messageFormatter.FormatMessage(_error, "Error occurred while getting forms data", false, undefined);
                reject(jsonString);
            }
            resolve(_response.body);
        });
    });

}

let GetFormsByID = (token, formID) => {
    return new Promise((resolve, reject) => {
        let uri = "https://api.typeform.com/forms/" + formID;

        uri = encodeURI(uri);

        request({
            method: "GET",
            url: uri,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }, function (_error, _response) {
            console.log(_response.body);

            if (_error) {
                console.log("Error occurred while getting forms data: " + _error);
                jsonString = messageFormatter.FormatMessage(_error, "Error occurred while getting forms data", false, undefined);
                reject(jsonString);
            }
            resolve(_response.body);
        });
    });
}