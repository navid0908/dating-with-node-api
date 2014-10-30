var models = require('../database');

exports.get = {
	tags: ['lookup', 'education'],
	description: "Lookup for various education levels",
	handler: function (request, reply) {
		models.Education.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
