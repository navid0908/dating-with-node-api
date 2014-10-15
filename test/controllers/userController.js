var Lab = require("lab");
var server = require("../../");
var dbHandler = require('../../database');

Lab.experiment("method:post, url:/user ", function() {
	Lab.test("create user with missing parameters - network", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                username:               "testusername",
                email:                  "testemail",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        //console.log(result);
	        Lab.expect(response.statusCode).to.equal(400); // we didn't pass network in the payload.
	        done();
	    });
	});
	Lab.test("create user with invalid parameter - short username", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 					"email",
                username:               "us", //this will fail the min requirement.
                email:                  "john@john.com", 
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        //console.log(result);
	        Lab.expect(response.statusCode).to.equal(400);
	        done();
	    });
	});
	Lab.test("create user with invalid parameter - large username", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 					"email",
                username:               "iamtypinginaverylongusernamethatshouldfailvalidation!31232132423", //too big
                email:                  "john@john.com", 
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        //console.log(result);
	        Lab.expect(response.statusCode).to.equal(400);
	        done();
	    });
    });
    Lab.test("create user with invalid parameter - bad email", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                username:               "someusername",
                email:                  "john@", //invalid email
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        //console.log(result);
	        Lab.expect(response.statusCode).to.equal(400);
	        done();
	    });
    });
    Lab.test("create user with invalid parameter - short password", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                username:               "someusername",
                email:                  "john@john.com",
                password:               "some1", //too short
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        // console.log(result);
	        Lab.expect(response.statusCode).to.equal(400);
	        done();
	    });
	});
	Lab.test("create user with an invalid network", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"yahoo",
                username:               "admin",
                email:                  "testemail@test.com",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(400);
	        done();
	    });
	});
	Lab.test("create user with reserved username - admin", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                username:               "admin",
                email:                  "testemail@test.com",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(409);
	        done();
	    });
	});
	Lab.test("create user with reserved username - support", function(done) {
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
	        Lab.expect(response.statusCode).to.equal(409);
	        done();
	    });
	});

	Lab.before(function (done) {
        //setup test records
        var userModel = dbHandler.models.User;
        userModel.createAccount('testjohndoe','randomemail@test.com','testpassword', function(result){
			done();
        });
    });
    Lab.after(function (done) {
        // clean up
        var userModel = dbHandler.models.User;
        userModel.query({where: {username: 'testjohndoe'}}).fetchAll().then(function(collection){
                collection.invokeThen('destroy').then(function() {
				  // ... all models in the collection have been destroyed
			});
		});
		userModel.query({where: {email: 'autogenerateusername@test.com'}}).fetchAll().then(function(collection){
                collection.invokeThen('destroy').then(function() {
				  // ... all models in the collection have been destroyed
				  done();
			});
        });
    });
	Lab.test("create user with existing username in system", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                username:               "testjohndoe",
                email:                  "randomemail@test.com",
                password:               "testpassword",
	        }
	    };	    
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(409);
	        done();
	    });
	});
	Lab.test("create user with existing email in system", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                username:               "dating-with-node-api",
                email:                  "randomemail@test.com",
                password:               "testpassword",
	        }
	    };	    
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(409);
	        done();
	    });
	});
	Lab.test("create user with auto generated username", function(done) {
	    var options = {
	        method: "post",
	        url: "/user/signup",
	        payload:
	        {
                network: 				"email",
                email:                  "autogenerateusername@test.com",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        //console.log(result);
	        Lab.expect(response.statusCode).to.equal(200);
	        done();
	    });
	});
});