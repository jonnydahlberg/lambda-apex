'use strict';

let AWS = require('aws-sdk');

exports.handle = function (event, context, callback) {

	let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const CLIENT_ID = process.env.CLIENT_ID;
	const { password, firstName, lastName, email } = event;

	var params = {
		ClientId: CLIENT_ID,
		Username: email,
		Password: password,
		UserAttributes: [
			{ Name: 'email', Value: email },
			{ Name: 'given_name', Value: firstName },
			{ Name: 'family_name', Value: lastName },
		]
	};

	cognitoidentityserviceprovider.signUp(params, function (err, data) {
		if (err) {
			console.log(err, err.stack);
			callback(err);
		} else {
			callback(null, data);
		}
	});
}