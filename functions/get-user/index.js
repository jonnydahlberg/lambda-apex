'use strict';

let AWS = require('aws-sdk');

exports.handle = function (event, context, callback) {
    let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    const { accessToken } = event;

    cognitoidentityserviceprovider.getUser({ AccessToken: accessToken }, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            let firstName, lastName;
            data.UserAttributes.forEach(element => {
                if (element.Name === 'given_name') {
                    firstName = element.Value;
                } else if (element.Name === 'family_name') {
                    lastName = element.Value;
                }
            });
            const body = {
                firstName,
                lastName,
                email: data.Username
            }
            callback(null, body)
        }
    });
}