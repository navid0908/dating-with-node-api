	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../../utils/auth');

	// Test shortcuts
	var lab = exports.lab = Lab.script();

/*
	***
		@description: The purpose here is to test profile update failures due to invalid parameters
	***
*/
	lab.experiment("method:put, url:/profile/{id} - Profile update fails due to invalid/missing parameters ", function() {
		var cookie;
		var user = {
					email: 'profiletestfailure@test.com',
					username: 'profiletestfailure',
					password: 'testpassword',
					network: 'email'
				};
		var profile = {
					gender: 'm',
					orientation: 's',
		};
		var userRecord;
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (result) {
				userRecord = result.toJSON();
				return userRecord;
			}).then(function (result) {
				profile.user_id = result.id;
				return models.Profile.add(profile);
			}).then(function (result) {
				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: 'email',
						email: user.email,
						password: user.password,
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
			models.Profile.findAll().
			then(function (collection) {
				// ... all Profiles have been destroyed
				return collection.invokeThen('destroy');
			}).then(function() {				  
				return models.User.destroy({id:userRecord.id})
			}).then(function() {
				done();
			});
		});
		lab.test("update user's profile with invalid orientation", function(done) {
			var orientations = ['X','x','m','f','M','F','S','G','B','L'];
			var payloadRequest;
			orientations.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						orientation:entry,
					},
					headers : {cookie:cookie}
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(400);
				});
			});
			done();
		});
		lab.test("update user's profile with invalid gender", function(done) {
			var genders = ['X','x','M','F','S','G','B','L'];
			var payloadRequest;
			genders.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						gender:entry,
					},
					headers : {cookie:cookie}
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(400);
				});
			});
			done();
		});
		lab.test("update user's profile with invalid birthday", function(done) {
			var genders = ['X','x','M','F','S','G','B','L'];
			var payloadRequest;
			var pastDate = new Date();
			genders.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						birthday:entry,
					},
					headers : {cookie:cookie}
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(400);
				});
			});
			done();
		});		
	});

/*
	***
		@description: The purpose here is to test successful profile update
	***
*/
	lab.experiment("method:put, url:/profile/{id} - Profile update succeeds for ", function() {
		var cookie;
		var user = {
					email: 'profiletestsuccess@test.com',
					username: 'profiletestsuccess',
					password: 'testpassword',
					network: 'email'
				};
		var userRecord;		
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (result) {
				userRecord = result.toJSON();

				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: 'email',
						email: user.email,
						password: user.password,
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
			models.Profile.findAll().
			then(function (collection) {
				// ... all Profiles have been destroyed
				return collection.invokeThen('destroy');
			}).then(function() {				  
				return models.User.destroy({id:userRecord.id})
			}).then(function() {
				done();
			});
		});
		lab.test("update user's profile with valid orientation", function(done) {
			var orientations = ['s', 'g', 'b'];
			var payloadRequest;
			orientations.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						orientation:entry,
					},
					headers : {cookie:cookie}
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(200);
				});
			});
			done();
		});
		lab.test("update user's profile with valid gender", function(done) {
			var genders = ['m', 'f'];
			var payloadRequest;
			genders.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						gender:entry,
					},
					headers : {cookie:cookie}
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(200);
				});
			});
			done();
		});		
	});	