//The purpose of this file is to test all crud statements for users. 
var Lab = require("lab"),
    server = require("../");

Lab.experiment("Users", function() {
	Lab.test("/users endpoint", function(done) {
	    var options = {
	        method: "GET",
	        url: "/users"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        done();
	    });
	});
});