'use strict'

let AWS = require('aws-sdk');
let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const CLIENT_ID = process.env.CLIENT_ID

exports.handle = function (event, context, callback) {

	const password = event.password;
	const UserAttributes = [];

	var params = {
		ClientId: CLIENT_ID,
		Username: event.email,
		Password: password,
		UserAttributes: [
			{ Name: 'email', Value: event.email },
			{ Name: 'name', Value: event.name },
			{ Name: 'family_name', Value: 'D' },
		]
	};

	cognitoidentityserviceprovider.signUp(params, function (err, data) {
		if (err) {
			console.log(err, err.stack);
			callback(err);
		} else {
			console.log(data);
			callback(null, data);
		}
	});
}