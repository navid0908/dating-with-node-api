	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../utils/auth');

	// Test shortcuts
	var lab = exports.lab = Lab.script();

/* 
	***
		@description: The purpose here is to test registration failure due to parameters being invalid.
	***
*/
	lab.experiment("method:post, url:/user Registration fails due to invalid/missing parameters", function() {
		lab.test("create user with missing parameters - network", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					username: "testusername",
					email: "testemail",
					password: "testpassword",
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(400); // we didn't pass network in the payload.
				done();
			});
		});
		lab.test("create user with missing parameters - invitationcode", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					username: "testusername",
					email: "testemail",
					password: "testpassword",
					network: "email"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				//console.log(result);
				Code.expect(response.statusCode).to.equal(400); // we didn't pass network in the payload.
				done();
			});
		});
		lab.test("create user with invalid parameter - username too short", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: "us", //this will fail the min requirement.
					email: "john@john.com",
					password: "testpassword",
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("create user with invalid parameter - username too big", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: "iamtypinginaverylongusernamethatshouldfailvalidation!31232132423", //too big
					email: "john@john.com",
					password: "testpassword",
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
	    });
		lab.test("create user with invalid parameter - bad email", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload: {
					network: "email",
					username: "someusername",
					email: "john@", //invalid email
					password: "testpassword",
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
	    lab.test("create user with invalid parameter - short password", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: "someusername",
					email: "john@john.com",
					password: "some1", //too short
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				// console.log(result);
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("create user with an invalid network", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "yahoo",
					username: "admin",
					email: "testemail@test.com",
					password: "testpassword",
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("create user with reserved username - admin", function(done) {
		    var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: "admin",
					email: "testemail@test.com",
					password: "testpassword",
					invitationcode: "some-uuid-number-here"
		        }
		    };
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(409);
				done();
			});
		});
		lab.test("create user with reserved username - support", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username:               "support",
					email:                  "testemail@test.com",
					password:               "testpassword",
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(409);
				done();
			});
		});
		lab.test("create user with invalid invitationcode", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: "dating-with-node-api",
					email: "somemeail@test.com",
					password: "testpassword",
					invitationcode: "some-uuid-number-that-does-not-exist"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(409);
				done();
			});
		});		
	});
/* 
	***
		@description: The purpose here is to test registration failure due to existing records or invalid referral.
	***
*/
	lab.experiment("method:post, url:/user  Registration fails due to existing records", function() {
		var user ={
				username:'testjohndoe',
				email: 'testjohndoe@test.com',
				password: 'testjohndoe'
		};
		var userData = null;
		lab.beforeEach(function (done) {
			//setup test records
			models.User.add(user).then(function (userRecord) {
				userData = userRecord.toJSON();
				done();
			});
		});
		lab.afterEach(function (done) {
			// clean up
			models.User.destroy({id:userData.id}).then(function () {
				done();
			});
		});
		lab.test("create user with existing username in system", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: user.username,
					email: "randomemail@test.com",
					password: user.password,
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(409);
				done();
			});
		});
		lab.test("create user with existing email in system", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					username: "dating-with-node-api",
					email: user.email,
					password: user.password,
					invitationcode: "some-uuid-number-here"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(409);
				done();
			});
		});
		lab.test("create user with used invitationcode", function(done) {
			models.Invitation.add({
				user_id:userData.id,
				email: "testemail@email.com",
			}).then(function(invitationRecord){
				return invitationRecord.markUsed().save();
			}).then(function(invitationRecord){
				invitationRecord = invitationRecord.toJSON();
				var options = {
					method: "post",
					url: "/user/signup",
					payload:
					{
						network: "email",
						username: "dating-with-node-api",
						email: "somemeail@test.com",
						password: "testpassword",
						invitationcode: invitationRecord.code
					}
				};
				server.inject(options, function(response) {
					var result = response.result;
					Code.expect(response.statusCode).to.equal(409);
					models.Invitation.destroy({id:invitationRecord.id}).then(function () {
						done();
					});					
				});
			});
		});
		lab.test("create user account whose email does not match email of the invitation", function(done) {
			//userData.id (testjohndoe@test.com) is invitting testemail@email.com
			models.Invitation.add({
				user_id:userData.id,
				email: "testemail@email.com",
			}).then(function(invitationRecord){
				invitationRecord = invitationRecord.toJSON();
				var options = {
					method: "post",
					url: "/user/signup",
					payload:
					{
						network: "email",
						username: "dating-with-node-api",
						email: "somemeail@test.com",
						password: "testpassword",
						invitationcode: invitationRecord.code
					}
				};
				server.inject(options, function(response) {
					var result = response.result;
					Code.expect(response.statusCode).to.equal(400);
					models.Invitation.destroy({id:invitationRecord.id}).then(function () {
						done();
					});
				});
			});
		});
	});
/*
	***
		@description: The purpose here is to test successful registration.
	***
*/
	lab.experiment("method:post, url:/user  Successful Registration:", function() {
		var user_being_invited_email = 'autogenerateusername@test.com';
		var user = {
			email: 'test-user-controller-signup@test.com',
			username: 'test-user-controller-signup',
			password: 'testpassword',
			network: 'email'
		};
		var userRecord;
		var invitationRecord;
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (result) {
				userRecord = result.toJSON();
				return userRecord;
			}).then(function (result) {
				return models.Invitation.add({user_id:result.id, email: user_being_invited_email});
			}).then(function(inviteRecord){
				invitationRecord = inviteRecord.toJSON();
				done();
			})
		});
		lab.afterEach(function (done) {
			models.Invitation.findOne({id:invitationRecord.id}).then(function (invitationRecord){
				//removing invitation record for testing purposes but it's kept even after the user registers.
				return models.Invitation.destroy({id:invitationRecord.id});
			}).then(function() {
				return models.User.destroy({id:userRecord.id})
			}).then(function() {
				done();
			});
		});

		lab.test("create user with auto generated username and valid invitation code", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					email: user_being_invited_email,
					password: "testpassword",
					invitationcode: invitationRecord.code
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(result.user[0].status).to.equal('active');
				models.User.findOne({email:user_being_invited_email}).then(function (userRecord) {
					return userRecord.destroy({id:userRecord.get('id')});
				}).then(function(){
					done();
				})
			});
		});
		lab.test("create user with invitation code that places user in pending status.", function(done) {
			var options = {
				method: "post",
				url: "/user/signup",
				payload:
				{
					network: "email",
					email: "some-email@test.com",
					password: "testpassword",
					invitationcode: models.Invitation.notInvited
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(result.user[0].status).to.equal('pending');
				models.User.findOne({email:options.payload.email}).then(function (userRecord) {
					return userRecord.destroy({id:userRecord.get('id')});
				}).then(function(){
					done();
				})
			});
		});
	});
/*
	***
		@description: The purpose here is to test successful user update.
	***
*/
	lab.experiment("method:put, url:/user/{id} ", function() {
		var cookie;
		var payload;
		var userRecordJson;
		var user = {
			email: 'test-user-controller-signup-success@test.com',
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
			models.User.destroy({id:userRecordJson.id}).then(function() {
				done();
			});
		});
	    lab.test("update user's username with authenticated user", function(done) {
			var payloadRequest = {
				method: "put",
				url: "/user/" + userRecordJson.id,
				payload: {
					username:'user-updating-his-username',
				},
				headers : {cookie:cookie}
			};
			util.getServerResponseAsPromise(payloadRequest).then(function(response){
				Code.expect(response.statusCode).to.equal(200);
				done();
			}).catch(function (error) {
				console.log(error);
			});
	    });
	});