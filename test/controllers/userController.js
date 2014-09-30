var Lab = require("lab"),
    server = require("../../"),
    _ = require("underscore");

Lab.experiment("method:post, url:/user ", function() {
	Lab.test("create user with missing parameters", function(done) {
	    var options = {
	        method: "post",
	        url: "/user",
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
	    });
	    done();
	});

	Lab.test("create user with invalid parameters", function(done) {
		//test failure with short username
	    var options = {
	        method: "post",
	        url: "/user",
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
	    });

	    //test failure with large username
	    options = {
	        method: "post",
	        url: "/user",
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
	    });

	    //test failure with invalid email format
	    options = {
	        method: "post",
	        url: "/user",
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
	    });

	    //test failure with short password
	    options = {
	        method: "post",
	        url: "/user",
	        payload:
	        {
                network: 					"email",
                username:               "someusername",
                email:                  "john@john.com",
                password:               "some1", //too short
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        // console.log(result);
	        Lab.expect(response.statusCode).to.equal(400);	        
	    });
	    done();
	});
	Lab.test("create user with an invalid network", function(done) {
	    var options = {
	        method: "post",
	        url: "/user",
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
	Lab.test("create user with reserved username", function(done) {
		//if this test fails, please check to see that you've ran the db seed for tests.

	    var options = {
	        method: "post",
	        url: "/user",
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
	    });
	    options = {
	        method: "post",
	        url: "/user",
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
	Lab.test("create user with existing username in system", function(done) {
	    //if this test fails, please check to see that you've ran the db seed for tests.
	    var options = {
	        method: "post",
	        url: "/user",
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
		//if this test fails, please check to see that you've ran the db seed for tests.
	    var options = {
	        method: "post",
	        url: "/user",
	        payload:
	        {
                network: 				"email",
                username:               "dating-with-node-api",
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
	Lab.test("create user with auto generated username", function(done) {
		//if this test fails, please check to see that you've ran the db seed for tests.
	    var options = {
	        method: "post",
	        url: "/user",
	        payload:
	        {
                network: 				"email",
                email:                  "newemail@test.com",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;	        
	        Lab.expect(response.statusCode).to.equal(200);
	        done();
	    });
	});
});