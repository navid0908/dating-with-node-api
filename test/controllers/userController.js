	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');

	// Test shortcuts
	var lab = exports.lab = Lab.script();

lab.experiment("method:post, url:/user ", function() {
	var user;
	lab.beforeEach(function (done) {
		//setup test records
		var userModel = models.User;
		var payload = {
				username:'testjohndoe',
				email: 'randomemail@test.com',
				password: 'testpassword'
			};
		userModel.add(payload).then(function (userRecord) {
			done();
		});
	});
	lab.afterEach(function (done) {
		// clean up
		models.User.findOne({username: 'testjohndoe'}).then(function (userRecord) {
			user = userRecord.toJSON();
			models.User.destroy({id:user.id}).then(function () {
				done();
			});
		});
	});
	lab.test("create user with missing parameters - network", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                username: 				"testusername",
                email: 					"testemail",
                password: 				"testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        //console.log(result);
	        Code.expect(response.statusCode).to.equal(400); // we didn't pass network in the payload.
	        done();
	    });
	});
	lab.test("create user with invalid parameter - short username", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                username: 				"us", //this will fail the min requirement.
                email: 					"john@john.com",
                password: 				"testpassword",
	        }
	    };
		server.inject(options, function(response) {
			var result = response.result;
			//console.log(result);
			Code.expect(response.statusCode).to.equal(400);
			done();
		});
	});
	lab.test("create user with invalid parameter - large username", function(done) {
	    var options = {
			method: "post",
			url: "/user/signup",
			payload:
			{
				network: 				"email",
				username: 				"iamtypinginaverylongusernamethatshouldfailvalidation!31232132423", //too big
				email: 					"john@john.com",
				password: 				"testpassword",
			}
		};
		server.inject(options, function(response) {
			var result = response.result;
			//console.log(result);
			Code.expect(response.statusCode).to.equal(400);
			done();
		});
    });
    lab.test("create user with invalid parameter - bad email", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
				network: 				"email",
				username: 				"someusername",
				email: 					"john@", //invalid email
				password: 				"testpassword",
	        }
	    };
	    server.inject(options, function(response) {
			var result = response.result;
			//console.log(result);
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
                network: 				"email",
                username: 				"someusername",
                email: 					"john@john.com",
                password: 				"some1", //too short
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
				network: 				"yahoo",
				username: 				"admin",
				email: 					"testemail@test.com",
				password: 				"testpassword",
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
				network: 				"email",
				username: 				"admin",
				email: 					"testemail@test.com",
				password: 				"testpassword",
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
				network: 				"email",
				username:               "support",
				email:                  "testemail@test.com",
				password:               "testpassword",
			}
		};
		server.inject(options, function(response) {
			var result = response.result;
			Code.expect(response.statusCode).to.equal(409);
			done();
		});
	});
	lab.test("create user with existing username in system", function(done) {
		var options = {
			method: "post",
			url: "/user/signup",
			payload:
			{
				network: 				"email",
				username: 				"testjohndoe",
				email: 					"randomemail@test.com",
				password: 				"testpassword",
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
				network: 				"email",
				username: 				"dating-with-node-api",
				email: 					"randomemail@test.com",
				password: 				"testpassword",
			}
		};
		server.inject(options, function(response) {
			var result = response.result;
			Code.expect(response.statusCode).to.equal(409);
			done();
		});
	});
	lab.test("create user with auto generated username", function(done) {
		var options = {
			method: "post",
			url: "/user/signup",
			payload:
			{
				network: 				"email",
				email: 					"autogenerateusername@test.com",
				password: 				"testpassword",
			}
		};
		server.inject(options, function(response) {
			var result = response.result;
			Code.expect(response.statusCode).to.equal(200);

			// clean up
			models.User.findOne({email: 'autogenerateusername@test.com'}).then(function (userRecord) {
				models.User.destroy({id:userRecord.id});
				done();
			});
		});
	});
});

lab.experiment("method:put, url:/user/{id} ", function() {
	var self = this;
	var user1 = {
				email: 'autogenerateusername1@test.com',
				username: 'autogenerateusername1',
				password: 'testpassword',
				network: 'email'
				};

	var user2 = {
				email: 'autogenerateusername2@test.com',
				username: 'autogenerateusername2',
				password: 'testpassword',
				network: 'email'
				};

	lab.beforeEach(function (done) {
		//setup test records
		models.User.add(user1).then(function (userRecord) {
			user1 = userRecord.toJSON();
		});
		models.User.add(user2).then(function (userRecord) {
			user2 = userRecord.toJSON();
			done();
		});
	});
	lab.afterEach(function (done) {
		// clean up
		models.User.destroy({id:user1.id}).then(function () {});
		models.User.destroy({id:user2.id}).then(function () {
			done();
		});
    });
    lab.test("update user's username with authenticated user", function(labTestDone) {
		var options;
		async.auto({
			loginUserOne : function(done){
				options = {
					method: "post",
					url: "/auth/login",
					payload: {
						network: 'email',
						email: user1.email,
						password: 'testpassword'
					}
				};
				server.inject(options, function(response) {
					Code.expect("set-cookie" in response.headers).to.equal(true);
					var cookie = response.headers['set-cookie'][0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
					done(null,cookie);
				});
			},
			updateUserOne: ['loginUserOne', function(done, results){
				options = {
					method: "put",
					url: "/user/" + user1.id,
					payload: {
						username:'autogenerateusername1111',
					},
					headers : {cookie:results.loginUserOne[0]}
				};
				console.log(options);
				server.inject(options, function(response) {
					Code.expect(response.statusCode).to.equal(200);
					done();
				});
			}]}, function(err, results){
					labTestDone();
			});
    });
});