//The purpose of this file is to test all crud statements for auth. 
var Lab = require("lab"),
    server = require("../");

Lab.experiment("Auth", function() {
	Lab.test("/auth/login endpoint", function(done) {
	    var options = {
	        method: "POST",
	        url: "/auth/login"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        done();
	    });
	});
	Lab.test("/auth/logout endpoint", function(done) {
	    var options = {
	        method: "get",
	        url: "/auth/logout"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        done();
	    });
	});
	Lab.test("/auth/verify endpoint", function(done) {
	    var options = {
	        method: "get",
	        url: "/auth/verify"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        done();
	    });
	});
	Lab.test("/auth/user endpoint", function(done) {
	    var options = {
	        method: "get",
	        url: "/auth/user"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        done();
	    });
	});
});