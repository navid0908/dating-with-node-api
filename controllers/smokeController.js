var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'smoke'],
	description: "Lookup for various smoking habbits",
	handler: function (request, reply) {
		dbHandler.models.Smoke.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
