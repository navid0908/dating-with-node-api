var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'bodytype'],
	description: "Lookup for various body types",
	handler: function (request, reply) {
		dbHandler.models.Bodytype.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
