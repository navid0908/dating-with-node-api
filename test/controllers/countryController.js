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
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('country');

			var rows = result.country[0];
			Lab.expect(rows).to.have.length(237);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('code');
			})
		});
		done();
	});
});