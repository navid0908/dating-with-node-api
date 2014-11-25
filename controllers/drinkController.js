var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'drink'],
	description: "Lookup for various drinking habbits",
	handler: function (request, reply) {
		models.Drink.findAll().then(function(result){
			if(result){
				return reply({drink: [result.toJSON()]});
			}
			return Boom.notFound('Drink types not found');
		});
	}
}
