var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'smoke'],
	description: "Lookup for various smoking habbits",
	handler: function (request, reply) {
		models.Smoke.findAll().then(function(result){
			if(result){
				return reply({smoke: [result.toJSON()]});
			}
			return Boom.notFound('Smoke types not found');
		});
	}
}
