var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'diet'],
	description: "Lookup for various diets",
	handler: function (request, reply) {
		dbHandler.models.Diet.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
