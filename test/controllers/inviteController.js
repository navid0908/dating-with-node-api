	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../utils/auth');
	var config = require("../../config/config");
	var	Promise = require('bluebird');

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
					email: 'test-invite-controller@test.com',
					username: 'test-invite-controller',
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
						network: user.network,
						email: user.email,
						password: user.password,
					}
				};
			}).then(function(payload){
				return util.loginAsPromise(payload);
			}).then(function(response){
				cookie = response;
				done();
			});
		});

		lab.afterEach(function (done) {
			util.logout(cookie, function(err, result) {});
			models.Invitation.findAll().
				then(function (collection) {
					// ... all Invitations have been destroyed
					return collection.invokeThen('destroy');
				}).then(function() {
					return models.User.destroy({id:userRecordJson.id})
				}).then(function() {
					done();
				});
		});
		lab.test("invitation to join fails due to systemMax", function(done) {
			for (var i=1; i<config.invitations.systemMax+1; i++){
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
			for (var i=1; i<config.invitations.userMax+1; i++){
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
		var cookie = null;
		var user = null;
		lab.beforeEach(function (done) {
			user = {
					email: 'test-invite-controller@test.com',
					username: 'test-invite-controller',
					password: 'invitepassword',
					network: 'email'
				};
			//setup test record
			models.User.add(user).then(function (userRecord) {
				user.id = userRecord.get('id');

				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: user.network,
						email: user.email,
						password: user.password,
					}
				};
			}).then(function(payload){
				return util.loginAsPromise(payload);
			}).then(function(response){
				cookie = response;
				done();
			});
		});
		lab.afterEach(function (done) {
			//logout
			util.logout(cookie, function(err, result) {});
			// clean up
			models.Invitation.findAll({user_id:user.id}).
				then(function (collection) {
					// destroy all invitations created by this user
					return collection.invokeThen('destroy');
				}).then(function() {
					return models.Setting.findAll({user_id:user.id});
				}).then(function(collection) {
					// destroy all settings for this user
					return collection.invokeThen('destroy');
				}).then(function() {
					  return models.User.destroy({id:user.id});
				}).then(function(){
					done();
				});
		});
		lab.test("invitation to join succeeds with increase in userMax", function(done) {
			var promises = [];
			var data = []
			var userMax = config.invitations.userMax + 10;

			//increase this users sending limit to the new user max.
			models.Setting.add({user_id:user.id, name:models.Setting.CONST_USER_MAX_INVITE, value: userMax});

			//create dummy invitation records upto 1 less than the new user max.
			for (var i=0; i<userMax-1; i++){
				promises.push(models.Invitation.add({user_id:user.id, email: "randomeemail" + i + "@gmail.com"}));
			}

			Promise.all(promises).then(function(result){
				var payload = {
							method: "post",
							url: "/invite",
							headers : {cookie:cookie},
							payload:
							{
								email : "testemail@email.com"
							}
						};
				util.getServerResponseAsPromise(payload).then(function(response){
					Code.expect(response.statusCode).to.equal(200);
					return models.Setting.findAll({user_id:user.id});
				}).then(function(collection){
					return collection.invokeThen('destroy');
				}).then(function(){
					done();
				});
			});
		});
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