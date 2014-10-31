var Lab = require("lab");
var server = require("../../");
var _ = require("lodash");

Lab.experiment("Education", function() {
	Lab.test("/education endpoint", function(done) {
	    var options = {
	        method: "GET",
	        url: "/education"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        Lab.expect(result).to.have.length(7);
	        _.each(result, function(row){
	        	var keys = Object.keys(row);
	        	Lab.expect(keys).to.have.length(2);
	        	Lab.expect(row).to.have.property('id');
	        	Lab.expect(row).to.have.property('description');
	        })
	    });
		done();
	});
});