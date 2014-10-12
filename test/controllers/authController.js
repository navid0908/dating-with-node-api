var Lab = require("lab");
var server = require("../../");
var dbHandler = require('../../database');

Lab.experiment("method:post, url:/auth/login ", function() {
	Lab.test("Login with an invalid network", function(done) {
	    var options = {
	        method: "post",
	        url: "/auth/login",
	        payload:
	        {
                network: 				"yahoo",
                email:                  "testemail@yahoo.com",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(400);
	        done();
	    });
	});
	Lab.test("Multiple login attempts with invalid credentials returns abuse message", function(done) {
		var testAbuseEmail = 'testabuse@abuse.com';
	    var options = {
	        method: "post",
	        url: "/auth/login",
	        payload:
	        {
                network: 				"email",
                email:                  testAbuseEmail,
                password:               "testpassword",
	        }
	    };

	    //setup abuse records
		for (var i=1; i<=5; i++){
			dbHandler.models.Authattempt.createEntry(testAbuseEmail, ' ', function(error, model){});
		}

	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(result.statusCode).to.equal(400);
	        Lab.expect(result.message).to.equal('Maximum number of attempts reached.');

			dbHandler.models.Authattempt.query({where: {email: testAbuseEmail}}).fetchAll().then(function(collection){
                collection.invokeThen('destroy').then(function() {
				  // ... all models in the collection have been destroyed
				  done();
				});
			});
	    });
	});
	Lab.test("Single Login attempt with invalid credentials returns proper error message", function(done) {
	    var options = {
	        method: "post",
	        url: "/auth/login",
	        payload:
	        {
                network: 				"email",
                email:                  "testemail@test.com",
                password:               "invalidpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(result.statusCode).to.equal(400);
	        Lab.expect(result.message).to.equal('Email and password combination do not match.');

			dbHandler.models.Authattempt.query({where: {email: 'testemail@test.com'}}).fetchAll().then(function(collection){
                collection.invokeThen('destroy').then(function() {
				  // ... all models in the collection have been destroyed
				  done();
				});
			});
	    });
	});
	Lab.test("Single Login attempt with invalid credentials stores abuse attempt", function(done) {
	    var options = {
	        method: "post",
	        url: "/auth/login",
	        payload:
	        {
                network: 				"email",
                email:                  "testemail@test.com",
                password:               "invalidpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(result.statusCode).to.equal(400);

	        // Lets inspect the db to see if a login attempt record was created
		    dbHandler.models.Authattempt.query({where: {email: 'testemail@test.com'}}).fetchAll().then(function(collection){
				Lab.expect(collection.length).to.equal(1);
                collection.invokeThen('destroy').then(function() {
				  // ... all models in the collection have been destroyed
				  done();
				});
			});
	    });
	});
	Lab.test("Single Login attempt with valid credentials creates session and no abuse attempt", function(done) {
	    var options = {
	        method: "post",
	        url: "/auth/login",
	        payload:
	        {
                network: 				"email",
                email:                  "testemail@test.com",
                password:               "testpassword",
	        }
	    };
	    server.inject(options, function(response) {
	        var result = response.headers;
	        Lab.expect("set-cookie" in result).to.equal(true);

	        // Lets inspect the db to see if a login attempt record was created
		    dbHandler.models.Authattempt.query({where: {email: 'testemail@test.com'}}).fetchAll().then(function(collection){
                Lab.expect(collection.length).to.equal(0);
                collection.invokeThen('destroy').then(function() {
				  // ... all models in the collection have been destroyed
				  done();
				});
			});
	    });
	});
});