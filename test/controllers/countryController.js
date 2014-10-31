var Lab = require("lab");
var server = require("../../");
var _ = require("lodash");

Lab.experiment("Country", function() {
	Lab.test("/country endpoint", function(done) {
	    var options = {
	        method: "GET",
	        url: "/country"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;
	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(result).to.be.instanceof(Array);
	        Lab.expect(result).to.have.length(237);
	        _.each(result, function(row){
	        	var keys = Object.keys(row);
	        	Lab.expect(keys).to.have.length(3);
	        	Lab.expect(row).to.have.property('id');
	        	Lab.expect(row).to.have.property('code');
	        	Lab.expect(row).to.have.property('name');
	        })
	    });
		done();
	});
});