var models = require('../database');

exports.get = {
	tags: ['lookup', 'drink'],
	description: "Lookup for various drinking habbits",
	handler: function (request, reply) {
		models.Drink.fetchAll().then(function(collection){
			return JSON.stringify(collection);
		});
	}
}
