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
	        Lab.expect(response.statusCode).to.equal(400); // we didn't pass type in the payload.	        
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
                type: 					"email",
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
                type: 					"email",
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
                type: 					"email",
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
                type: 					"email",
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
	    //test failure with short password
	    options = {
	        method: "post",
	        url: "/user",
	        payload:
	        {
                type: 					"email",
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
});