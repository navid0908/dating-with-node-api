var models = require('../database');

exports.get = {
	tags: ['lookup', 'bodytype'],
	description: "Lookup for various body types",
	handler: function (request, reply) {
		models.Bodytype.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
