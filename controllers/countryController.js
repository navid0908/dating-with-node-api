var models = require('../database');

exports.get = {
	tags: ['lookup', 'country'],
	description: "Lookup for various countries",
	handler: function (request, reply) {
		models.Country.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
