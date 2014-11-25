var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'country'],
	description: "Lookup for various countries",
	handler: function (request, reply) {
		models.Country.findAll().then(function(result){
			if(result){
				return reply({country: [result.toJSON()]});
			}
			return Boom.notFound('Countries not found');
		});
	}
}
