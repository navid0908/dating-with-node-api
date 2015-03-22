	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../utils/auth');
	var config = require("../../config/config");

	// Test shortcuts
	var lab = exports.lab = Lab.script();

/* 
	***
		@description: The purpose here is to test invitation failure due to limits being reached.
	***
*/
	lab.experiment("method:post, url:/invite Invitation fails due to limit being reached", function() {
		var cookie;
		var payload;
		var userRecordJson;
		var user = {
					email: 'autogenerateusername212@test.com',
					username: 'autogenerateuser2nam2e1',
					password: 'testpassword',
					network: 'email'
				};
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (userRecord) {
				userRecordJson = userRecord.toJSON();

				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: 'email',
						email: userRecordJson.email,
						password: 'testpassword',
					}
				};
			}).then(function(payloadRequest){
				//perform login action and store the cookie.
				util.login(payloadRequest, function(err, result) {
					cookie = result;
					done();
				});
			});
		});

		lab.afterEach(function (done) {
			//logout
			util.logout(cookie, function(err, result) {});
			models.Invitation.findAll().
			then(function (collection) {
				// ... all Invitations have been destroyed
				return collection.invokeThen('destroy');
			}).then(function() {				  
				return models.User.destroy({id:userRecordJson.id})
			}).then(function() {
				done();
			})
		});

		lab.test("invitation to join fails due to systemMax", function(done) {
			for (var i=1; i<config.invitation.systemMax+1; i++){
				models.Invitation.add({
					user_id:userRecordJson.id,
					email: "randomeemail" + i + "@gmail.com"
				});
			}
			payload = {
				method: "post",
				url: "/invite",
				headers : {cookie:cookie},
				payload:
				{
					email : "testemail@email.com"
				}
			};
			server.inject(payload, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
		    });
		});
		lab.test("invitation to join fails due to userMax", function(done) {
			for (var i=1; i<config.invitation.userMax+1; i++){
				models.Invitation.add({
					user_id:userRecordJson.id,
					email: "randomeemail" + i + "@gmail.com"
				});
			}
			payload = {
				method: "post",
				url: "/invite",
				headers : {cookie:cookie},
				payload:
				{
					email : "testemail@email.com"
				}
			};
			server.inject(payload, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
		    });
		});
		lab.test("invitation to join fails due to user invite already sent", function(done) {
			models.Invitation.add({
				user_id:userRecordJson.id,
				email: "testemail@email.com"
			}).then(function(invitationRecord){
				payload = {
					method: "post",
					url: "/invite",
					headers : {cookie:cookie},
					payload:
					{
						email : "testemail@email.com"
					}
				};
				server.inject(payload, function(response) {
					Code.expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});
	});

/* 
	***
		@description: The purpose here is to test successful invitation
	***
*/
	lab.experiment("method:post, url:/invite Invitation succeeds", function() {
		var cookie;
		var user = {
					email: 'invitetest@test.com',
					username: 'invitationtest',
					password: 'invitepassword',
					network: 'email'
				};
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (userRecord) {
				user = userRecord.toJSON();

				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: 'email',
						email: user.email,
						password: 'invitepassword',
					}
				};
			}).then(function(payloadRequest){
				//perform login action and store the cookie.
				util.login(payloadRequest, function(err, result) {
					cookie = result;
					done();
				});
			});
		});
		lab.afterEach(function (done) {
			//logout
			util.logout(cookie, function(err, result) {});
			// clean up
			models.Invitation.findAll().
			then(
				function (collection) {
					// destroy all invitations
					return collection.invokeThen('destroy');
				}).
			then(function() {
				  return models.User.destroy({id:user.id});
			}).
			then(function(){
				done();
			});
		});
		// lab.test("invitation to join succeeds with increase in userMax", function(done) {
		// 	var userMax = config.invitation.userMax + 10;
		// 	payload = {
		// 		method: "post",
		// 		url: "/invite",
		// 		headers : {cookie:cookie},
		// 		payload:
		// 		{
		// 			email : "testemail@email.com"
		// 		}
		// 	};
		// 	//create dummy invitation records upto 1 less than the new user max. 
		// 	for (var i=0; i<userMax-1; i++){
		// 		models.Invitation.add({
		// 			user_id:1,
		// 			email: "randomeemail" + i + "@gmail.com"
		// 		});
		// 	}
		// 	server.inject(payload, function(response) {
		// 		Code.expect(response.statusCode).to.equal(200);
		// 		done();
		//     });
		// });
		lab.test("invitation to join succeeds", function(done) {
			var payload = {
				method: "post",
				url: "/invite",
				headers : {cookie:cookie},
				payload:
				{
					email : "somevalidemail@email.com"
				}
			};
			server.inject(payload, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});	
	});