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
	var tmp;
	var cookie;
	var payloadRequest;
	var user = {
				email: 'autogenerateusername212@test.com',
				username: 'autogenerateuser2nam2e1',
				password: 'testpassword',
				network: 'email'
				};

	//this will create a user, log in the user and store the cookie for later use within the tests.
	lab.beforeEach(function (done) {
		//setup test record
		models.User.add(user).then(function (userRecord) {
			user = userRecord.toJSON();

			//setup payload to login for newly created user.
			payloadRequest = { method: "post",url: "/auth/login",
						payload: {
							network: 'email',
							email: user.email,
							password: 'testpassword'
						}
					};
			//perform login action and store the cookie.
			server.inject(payloadRequest, function(response) {
				Code.expect("set-cookie" in response.headers).to.equal(true);
				tmp = response.headers['set-cookie'][0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
				cookie = tmp[0];
				done();
			});
		});
	});
	lab.afterEach(function (done) {
		//setup payload to logout user.
			payloadRequest = { method: "get",url: "/auth/logout",headers : {cookie:cookie}};
			//perform log out action
			server.inject(payloadRequest, function(response) {
		        Code.expect(response.statusCode).to.equal(200);
		        // remove dummy user
				models.User.destroy({id:user.id}).then(function () {
					done();
				});
			});
    });
    lab.test("update user's username with authenticated user", function(done) {
		payloadRequest = {
			method: "put",
			url: "/user/" + user.id,
			payload: {
				username:'autogenerateusername1111',
			},
			headers : {cookie:cookie}
		};
		server.inject(payloadRequest, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			done();
		});
    });
});