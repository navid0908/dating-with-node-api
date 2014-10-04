var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'activelevel'],
	description: "Lookup for various active levels",
	handler: function (request, reply) {
		dbHandler.models.Activelevel.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
