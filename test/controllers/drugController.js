
var Lab = require("lab"),
    server = require("../../"),
    _ = require("underscore");

Lab.experiment("Drug", function() {
	Lab.test("/drug endpoint", function(done) {
	    var options = {
	        method: "GET",
	        url: "/drug"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        Lab.expect(result).to.have.length(3);
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