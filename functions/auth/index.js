'use strict';

let AWS = require('aws-sdk');

exports.handle = function (event, context, callback) {

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const { CLIENT_ID, USER_POOL_ID } = process.env;
    const { username, password } = event;

    var params = {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        ClientId: CLIENT_ID,
        UserPoolId: USER_POOL_ID,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        },
    };
    cognitoidentityserviceprovider.adminInitiateAuth(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            callback(null, { body: data });
        }
    });
}