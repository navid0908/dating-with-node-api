var Lab = require("lab");
var Code = require('code');   // assertion library
var server = require("../../");
var models = require('../../database');
var async = require('async');
var config = require("../../config/config");
var util = require('../../utils/auth');

// Test shortcuts
var lab = exports.lab = Lab.script();

lab.experiment("method:post, url:/invite ", function() {	
	var cookie;
	var payload;
	var result;
	var tmp;

	lab.beforeEach(function (done) {
		payload = {
			method: "post",
			url: "/auth/login",
			payload:
			{
				network: 'email',
				email: 'testemail@test.com',
				password: 'testpassword'
			}
		};
		//perform login action and store the cookie.
		util.login(payload, function(err, result) {
			cookie = result;
			done();
		});
	});
	lab.afterEach(function (done) {
		// clean up
		models.Invitation.findAll().then(function (collection) {
			collection.invokeThen('destroy').then(function() {
			  // ... all Invitations have been destroyed				
			});
		});
		//logout
		util.logout(cookie, function(err, result) {
			done();
		});
	});
	lab.test("invitation to join fails due to systemMax", function(done) {
		payload = {
			method: "post",
			url: "/invite",
			headers : {cookie:cookie},
			payload:
			{
				email : "testemail@email.com"
			}
		};
		for (var i=0; i<config.invitation.systemMax; i++){
			models.Invitation.add({
				user_id:1,
				email: "randomeemail" + i + "@gmail.com"
			});
		}
		server.inject(payload, function(response) {
			result = response.result;
			Code.expect(response.statusCode).to.equal(400);
			done();
	    });
	});
	lab.test("invitation to join fails due to userMax", function(done) {
		payload = {
			method: "post",
			url: "/invite",
			headers : {cookie:cookie},
			payload:
			{
				email : "testemail@email.com"
			}
		};
		for (var i=0; i<config.invitation.userMax; i++){
			models.Invitation.add({
				user_id:1,
				email: "randomeemail" + i + "@gmail.com"
			});
		}
		server.inject(payload, function(response) {
			result = response.result;
			Code.expect(response.statusCode).to.equal(400);
			done();
	    });
	});
	lab.test("invitation to join fails due to user invite already sent", function(done) {
		payload = {
			method: "post",
			url: "/invite",
			headers : {cookie:cookie},
			payload:
			{
				email : "testemail@email.com"
			}
		};

		models.Invitation.add({
			user_id:1,
			email: "testemail@email.com"
		}).then(function(invitationRecord){
			server.inject(payload, function(response) {
				result = response.result;
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
	});
	lab.test("invitation to join succeeds", function(done) {
		payload = {
			method: "post",
			url: "/invite",
			headers : {cookie:cookie},
			payload:
			{
				email : "somevalidemail@email.com"
			}
		};
		server.inject(payload, function(response) {
			result = response.result;
			Code.expect(response.statusCode).to.equal(200);
			done();
		});
	});	
});