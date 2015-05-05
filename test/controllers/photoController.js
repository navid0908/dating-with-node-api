	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../utils/auth');
	var date = require('../utils/date');
	var fs = require('fs');
	var FormData = require('form-data');
	var Stream2Promise = require('stream-to-promise');
	var	Promise = require('bluebird');

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
		var random;
		var cookie;
		lab.beforeEach(function (done) {
			random = Math.floor((Math.random() * 1000) + 1);
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
					filepath: '/somelocation.jpg',
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
		lab.test("with invalid username", function(done) {
			var payloadRequest = {
				method: "get",
				url: "/photo/somerandomeusername",
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
		var random;
		var cookie;
		lab.beforeEach(function (done) {
			random = Math.floor((Math.random() * 1000) + 1);
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
					filepath: '/somelocation.jpg',
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
		lab.test("with valid username", function(done) {
			var payloadRequest = {
				method: "get",
				url: "/photo/" + user.username,
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

/*
	***
		@description: The purpose here is to test failure of photo add
	***
*/
	lab.experiment("method:post, url:/photo - Photo add fails ", function() {
		var user;
		var random;
		var cookie;
		lab.beforeEach(function (done) {
			random = Math.floor((Math.random() * 1000) + 1);
			user = {
					email: 'photoaddtest'+random+'@test.com',
					username: 'photoaddtest'+random,
					password: 'testpassword',
					network: 'email'
				};
			models.User.add(user).then(function (result) {
				user.id = result.get('id');
				return user;
			}).then(function (user) {
				var photo = {
					user_id: user.id,
					filepath: '/somelocation.jpg',
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
		lab.test("with invalid image type", function(done) {
			var headers = null;
			var payloadRequest = null;
			var image = {
				//file: fs.createReadStream('./test/data/photos/1200x800.jpg'),
				file : new Buffer('test image'),
			}
			var form = new FormData();

			// Fill the form object
			Object.keys(image).forEach(function (key) {
				form.append(key, image[key]);
			});

			Stream2Promise(form).then(function(payload){
				headers = form.getHeaders();
				headers.cookie = cookie;

				payloadRequest = {
					method: "post",
					url: "/photo",
					payload: payload,
					headers : headers
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(400);
					done();
				});
			});
		});
	});
/*
	***
		@description: The purpose here is to test failure of photo add
	***
*/
	lab.experiment("method:post, url:/photo - Photo add success ", function() {
		var user;
		var random;
		var cookie;
		lab.beforeEach(function (done) {
			random = Math.floor((Math.random() * 1000) + 1);
			user = {
					email: 'photoaddtest'+random+'@test.com',
					username: 'photoaddtest'+random,
					password: 'testpassword',
					network: 'email'
				};
			models.User.add(user).then(function (result) {
				user.id = result.get('id');
				return user;
			}).then(function (user) {
				var photo = {
					user_id: user.id,
					filepath: '/somelocation.jpg',
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
		lab.test("with valid image type", function(done) {
			var headers = null;
			var payloadRequest = null;
			var image = {
				file: fs.createReadStream('./test/data/photos/1200x800.jpg'),
				primary: 1,
				caption: 'dude'
			}
			var form = new FormData();

			// Fill the form object
			Object.keys(image).forEach(function (key) {
				form.append(key, image[key]);
			});

			Stream2Promise(form).then(function(payload){
				headers = form.getHeaders();
				headers.cookie = cookie;

				payloadRequest = {
					method: "post",
					url: "/photo",
					payload: payload,
					headers : headers
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(200);
					Code.expect("photo" in response.result).to.equal(true);
					models.Photo.destroy({id:response.result.photo.id}).then(function(result){
						fs.unlink(response.result.photo.filepath);
						done();
					});
				});
			});
		});
	});
/*
	***
		@description: The purpose here is to test failure of put
	***
*/
	lab.experiment("method:put, url:/photo/{id} - Photo put fails ", function() {
		var user;
		var photo;
		var random;
		var cookie;
		lab.beforeEach(function (done) {
			random = Math.floor((Math.random() * 1000) + 1);
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
				photo = {
					user_id: user.id,
					filepath: '/somelocation.jpg',
					caption: 'somecaption'
				};
				models.Photo.add(photo).then(function(result){
					photo.id = result.get('id');
				})
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
				method: "put",
				url: "/photo/" + photo.id + 120202020202,
				payload: {
					caption:'planet of the apes',
				},
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(404);
				done();
			});
		});
		lab.test("with invalid caption length - greater than max", function(done) {
			var caption="";
			//generate a caption with length 141.
			for(var i=1; i<=141;i++){
				caption+='a';
			}
			Code.expect(caption.length).to.equal(141);
			var payloadRequest = {
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					caption:caption
				},
				headers : {cookie:cookie}
			};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("with invalid caption length - less than min", function(done) {
			var payloadRequest = {
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					caption:''
				},
				headers : {cookie:cookie}
			};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("with invalid primary option", function(done) {
			var payloadRequest = {
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					primary:3
				},
				headers : {cookie:cookie}
			};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
	});
/*
	***
		@description: The purpose here is to test success of put
	***
*/
	lab.experiment("method:put, url:/photo/{id} - Photo put succeeds ", function() {
		var user;
		var photo;
		var random;
		var cookie;
		lab.beforeEach(function (done) {
			random = Math.floor((Math.random() * 1000) + 1);
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
				photo = {
					user_id: user.id,
					filepath: '/somelocation.jpg',
					caption: 'somecaption'
				};
				models.Photo.add(photo).then(function(result){
					photo.id = result.get('id');
				})
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
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					caption:'planet of the apes',
				},
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
		lab.test("with valid caption length - greater than min but less than max", function(done) {
			var caption="";
			//generate a caption with length 140.
			for(var i=1; i<=140;i++){
				caption+='a';
			}
			Code.expect(caption.length).to.equal(140);
			var payloadRequest = {
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					caption:caption
				},
				headers : {cookie:cookie}
			};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
		lab.test("with valid caption length - equal to min", function(done) {
			var payloadRequest = {
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					caption:'a'
				},
				headers : {cookie:cookie}
			};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
		lab.test("with valid primary option - 1", function(done) {
			var payloadRequest = {
					method: "put",
					url: "/photo/" + photo.id,
					payload: {
						primary:1
					},
					headers : {cookie:cookie}
				};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
		lab.test("with valid primary option - 1 and makes other primary photo 0", function(done) {
			var promises = [];
			var i;
			for (i=0; i<10; i++){
				promises.push(
					models.Photo.add(
					{
						user_id: user.id,
						primary:1,
						filepath: '/somelocation.jpg',
						caption: 'somecaption',
					})
				);
			}
			Promise.all(promises).then(function(dataArr) {
				var payloadRequest = {
					method: "put",
					url: "/photo/" + photo.id,
					payload: {
						primary:1
					},
					headers : {cookie:cookie}
				};
				util.getServerResponseAsPromise(payloadRequest).then(function(response){
					Code.expect(response.statusCode).to.equal(200);
					return models.Photo.findAll({user_id:user.id});
				}).then(function(collection){
					if(collection){
						return collection.invokeThen('destroy');
					}
				}).then(function(){
					done();
				})
			})
		});
		lab.test("with valid primary option - 0", function(done) {
			var payloadRequest = {
				method: "put",
				url: "/photo/" + photo.id,
				payload: {
					primary:0
				},
				headers : {cookie:cookie}
			};

			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});