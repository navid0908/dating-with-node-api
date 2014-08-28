//The purpose of this file is to test all crud statements for profiles. 
var Lab = require("lab"),
    server = require("../");

Lab.experiment("Profile", function() {
	Lab.test("/profiles endpoint", function(done) {
	    var options = {
	        method: "GET",
	        url: "/profiles"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        done();
	    });
	});
});