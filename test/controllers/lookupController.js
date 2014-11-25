var Lab = require("lab");
var server = require("../../");
var _ = require("lodash");

Lab.experiment("Lookup", function() {
	Lab.test("/activelevel get endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/activelevel"
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
			});
			done();
		});
	});
	Lab.test("/astrologicalsign endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/astrologicalsign"
	    };
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('astrologicalsign');

			var rows = result.astrologicalsign[0];
			Lab.expect(rows).to.have.length(12);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/bodytype endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/bodytype"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('bodytype');

			var rows = result.bodytype[0];
			Lab.expect(rows).to.have.length(10);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/buzzline endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/buzzline"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('buzzline');

			var rows = result.buzzline[0];
			Lab.expect(rows).to.have.length(10);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/children endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/children"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('children');

			var rows = result.children[0];
			Lab.expect(rows).to.have.length(3);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/country endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/country"
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
			});
			done();
		});
	});
	Lab.test("/diet endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/diet"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('diet');

			var rows = result.diet[0];
			Lab.expect(rows).to.have.length(6);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/drink endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/drink"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('drink');

			var rows = result.drink[0];
			Lab.expect(rows).to.have.length(5);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/drug endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/drug"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('drug');

			var rows = result.drug[0];
			Lab.expect(rows).to.have.length(3);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/education endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/education"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('education');

			var rows = result.education[0];
			Lab.expect(rows).to.have.length(7);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/phototype endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/phototype"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('phototype');

			var rows = result.phototype[0];
			Lab.expect(rows).to.have.length(2);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('size');
			});
			done();
		});
	});
	Lab.test("/profession endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/profession"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('profession');

			var rows = result.profession[0];
			Lab.expect(rows).to.have.length(20);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
	Lab.test("/relationshipstatus endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/relationshipstatus"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('relationshipstatus');

			var rows = result.relationshipstatus[0];
			Lab.expect(rows).to.have.length(6);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});	
	Lab.test("/smoke endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/smoke"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Lab.expect(response.statusCode).to.equal(200);
			Lab.expect(response.result).to.be.instanceof(Object);
			Lab.expect(result).to.have.property('smoke');

			var rows = result.smoke[0];
			Lab.expect(rows).to.have.length(5);

			_.each(rows, function(row){
				Lab.expect(row).to.have.property('id');
				Lab.expect(row).to.have.property('description');
			});
			done();
		});
	});
});