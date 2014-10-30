var models = require('../database');

exports.get = {
	tags: ['lookup', 'activelevel'],
	description: "Lookup for various active levels",
	handler: function (request, reply) {
		models.Activelevel.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
