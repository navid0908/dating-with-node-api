var Lab = require("lab");
var server = require("../../");
var _ = require("lodash");

Lab.experiment("Activelevel", function() {
	Lab.test("/activelevel endpoint", function(done) {
	    var options = {
	        method: "GET",
	        url: "/activelevel"
	    };
	    server.inject(options, function(response) {
	        var result = response.result;

	        Lab.expect(response.statusCode).to.equal(200);
	        Lab.expect(response.result).to.be.instanceof(Object);
	        Lab.expect(result).to.have.property('activelevel');

	        var rows = result.activelevel[0];
			Lab.expect(rows).to.have.length(5);

	        _.each(rows, function(row){
	        	Lab.expect(row).to.have.property('id');
	        	Lab.expect(row).to.have.property('description');
	        })
	    });
		done();
	});
});