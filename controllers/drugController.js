var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'drug'],
	description: "Lookup for various drug habbits",
	handler: function (request, reply) {
		dbHandler.models.Drug.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}