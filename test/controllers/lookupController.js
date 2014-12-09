	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var _ = require("lodash");

	// Test shortcuts
	var lab = exports.lab = Lab.script();

lab.experiment("Lookup", function() {
	lab.test("/activelevel get endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/activelevel"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('activelevel')).to.be.a.boolean();

			var rows = result.activelevel;
			Code.expect(rows).to.have.length(5);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/astrologicalsign endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/astrologicalsign"
	    };
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('astrologicalsign')).to.be.a.boolean();

			var rows = result.astrologicalsign;
			Code.expect(rows).to.have.length(12);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/bodytype endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/bodytype"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('bodytype')).to.be.a.boolean();

			var rows = result.bodytype;
			Code.expect(rows).to.have.length(10);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/buzzline endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/buzzline"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('buzzline')).to.be.a.boolean();

			var rows = result.buzzline;
			Code.expect(rows).to.have.length(10);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/children endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/children"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('children')).to.be.a.boolean();

			var rows = result.children;
			Code.expect(rows).to.have.length(3);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/country endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/country"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('country')).to.be.a.boolean();

			var rows = result.country;
			Code.expect(rows).to.have.length(237);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('code')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/diet endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/diet"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('diet')).to.be.a.boolean();

			var rows = result.diet;
			Code.expect(rows).to.have.length(6);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/drink endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/drink"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('drink')).to.be.a.boolean();

			var rows = result.drink;
			Code.expect(rows).to.have.length(5);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/drug endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/drug"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('drug')).to.be.a.boolean();

			var rows = result.drug;
			Code.expect(rows).to.have.length(3);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/education endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/education"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('education')).to.be.a.boolean();

			var rows = result.education;
			Code.expect(rows).to.have.length(7);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/phototype endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/phototype"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('phototype')).to.be.a.boolean();

			var rows = result.phototype;
			Code.expect(rows).to.have.length(2);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('size')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/profession endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/profession"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('profession')).to.be.a.boolean();

			var rows = result.profession;
			Code.expect(rows).to.have.length(20);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
	lab.test("/relationshipstatus endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/relationshipstatus"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('relationshipstatus')).to.be.a.boolean();

			var rows = result.relationshipstatus;
			Code.expect(rows).to.have.length(6);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});	
	lab.test("/smoke endpoint", function(done) {
		var options = {
			method: "GET",
			url: "/lookup/smoke"
		};
		server.inject(options, function(response) {
			var result = response.result;

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(response.result).to.be.instanceof(Object);
			Code.expect(result.hasOwnProperty('smoke')).to.be.a.boolean();

			var rows = result.smoke;
			Code.expect(rows).to.have.length(5);

			_.each(rows, function(row){
				Code.expect(row.hasOwnProperty('id')).to.be.a.boolean();
				Code.expect(row.hasOwnProperty('description')).to.be.a.boolean();
			});
			done();
		});
	});
});