	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');

	// Test shortcuts
	var lab = exports.lab = Lab.script();

	lab.experiment("method:post, url:/auth/login ", function() {
		lab.test("Login with an invalid network", function(done) {
			var options = {
				method: "post",
				url: "/auth/login",
				payload:
				{
					network: "yahoo",
					email: "testemail@yahoo.com",
					password: "testpassword"
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("Multiple login attempts with invalid credentials returns abuse message", function(done) {
			var testAbuseEmail = 'testabuse@abuse.com';
			var options = {
				method: "post",
				url: "/auth/login",
				payload:
				{
					network: "email",
					email: testAbuseEmail,
					password: "testpassword",
				}
			};
			//setup abuse records
			for (var i=1; i<=5; i++){
				models.Authattempt.add({email:testAbuseEmail, ip:' '}).then(function(result){});
			}
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(result.statusCode).to.equal(400);
				Code.expect(result.message).to.equal('Maximum number of attempts reached.');

				// clean up
				models.Authattempt.findAll({email: testAbuseEmail, ip: ' '}).then(function (collection) {
					collection.invokeThen('destroy').then(function() {
						// ... all models in the collection have been destroyed
						done();
					});
					Code.expect(collection.length).to.equal(5);
				});
			});
		});
		lab.test("Single Login attempt with invalid credentials returns proper error message", function(done) {
			var options = {
				method: "post",
				url: "/auth/login",
				payload:
				{
					network: "email",
					email: "testemail@test.com",
					password: "invalidpassword",
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(result.statusCode).to.equal(400);
				Code.expect(result.message).to.equal('Email and password combination do not match.');

				// clean up
				models.Authattempt.findAll({email: 'testemail@test.com', ip: ' '}).then(function (collection) {
					collection.invokeThen('destroy').then(function() {
					// ... all models in the collection have been destroyed
						done();
					});
				});
			});
		});
		lab.test("Single Login attempt with invalid credentials stores abuse attempt", function(done) {
			var options = {
				method: "post",
				url: "/auth/login",
				payload:
				{
					network: "email",
					email: "testemail@test.com",
					password: "invalidpassword",
				}
			};
			server.inject(options, function(response) {
				var result = response.result;
				Code.expect(result.statusCode).to.equal(400);

				// Lets inspect the db to see if a login attempt record was created
				// clean up
				models.Authattempt.findAll({email: 'testemail@test.com', ip: ' '}).then(function (collection) {
					Code.expect(collection.length).to.equal(1);
					collection.invokeThen('destroy').then(function() {
						// ... all models in the collection have been destroyed
						done();
					});
				});
			});
		});
		lab.test("Single Login attempt with valid credentials creates session and no abuse attempt", function(done) {
			var options = {
				method: "post",
				url: "/auth/login",
				payload:
				{
					network: "email",
					email: "testemail@test.com",
					password: "testpassword",
				}
			};
			server.inject(options, function(response) {
				var result = response.headers;
				Code.expect("set-cookie" in result).to.equal(true);

				// DB should not have any login attempts as the credentials are valid.
				// clean up
				models.Authattempt.findAll({email: 'testemail@test.com', ip: ' '}).then(function (collection) {
					Code.expect(collection.length).to.equal(0);
					done();
				});
			});
		});
	});
