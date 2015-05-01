	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../utils/auth');
	var date = require('../utils/date');

	var _ = require("lodash");

	// Test shortcuts
	var lab = exports.lab = Lab.script();
/*
	***
		@description: The purpose here is to test failure of get
	***
*/
	lab.experiment("method:get, url:/photo - Photo get fails ", function() {
		var user;
		var random = Math.floor((Math.random() * 1000) + 1);
		var cookie;
		lab.beforeEach(function (done) {
			user = {
					email: 'phototest'+random+'@test.com',
					username: 'phototest'+random,
					password: 'testpassword',
					network: 'email'
				};
			models.User.add(user).then(function (result) {
				user.id = result.get('id');
				return user;
			}).then(function (user) {
				var photo = {
					user_id: user.id,
					location: '/somelocation.jpg',
					caption: 'somecaption'
				};
				models.Photo.add(photo);
				return user;
			}).then(function (user) {
				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: user.network,
						email: user.email,
						password: user.password
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
			var payload = {
				method: "get",
				url: "/auth/logout",
				headers : {cookie:cookie}
			};

			//logout
			util.logoutAsPromise(cookie).then(function(){
				return models.Photo.findOne({user_id:user.id});
			}).then(function (photoRecord) {
				if(photoRecord){
					return models.Photo.destroy({id:photoRecord.get('id')});
				}
			}).then(function() {
				return models.User.destroy({id:user.id});
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid id", function(done) {
			var payloadRequest = {
				method: "get",
				url: "/photo?id=" + user.id + 1010101010101010,
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(404);
				done();
			});
		});
	});

/*
	***
		@description: The purpose here is to test successful photo get
	***
*/
	lab.experiment("method:get, url:/photo - Photo get succeeds ", function() {		
		var user;
		var random = Math.floor((Math.random() * 1000) + 1);
		var cookie;
		lab.beforeEach(function (done) {
			user = {
					email: 'phototest'+random+'@test.com',
					username: 'phototest'+random,
					password: 'testpassword',
					network: 'email'
				};
			models.User.add(user).then(function (result) {
				user.id = result.get('id');
				return user;
			}).then(function (user) {
				var photo = {
					user_id: user.id,
            		location: '/somelocation.jpg',
            		caption: 'somecaption'
            	};
            	models.Photo.add(photo);
            	return user;
			}).then(function (user) {
				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: user.network,
						email: user.email,
						password: user.password
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
			var payload = {
				method: "get",
				url: "/auth/logout",
				headers : {cookie:cookie}
			};

			//logout
			util.logoutAsPromise(cookie).then(function(){
				return models.Photo.findOne({user_id:user.id});
			}).then(function (photoRecord) {
				if(photoRecord){
					return models.Photo.destroy({id:photoRecord.get('id')});					
				}
			}).then(function() {
				return models.User.destroy({id:user.id});
			}).then(function() {
				done();
			});
		});
		lab.test("with valid id", function(done) {
			var payloadRequest = {
				method: "get",
				url: "/photo?id=" + user.id,
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});