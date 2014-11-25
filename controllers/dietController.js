var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'diet'],
	description: "Lookup for various diets",
	handler: function (request, reply) {
		models.Diet.findAll().then(function(result){
			if(result){
				return reply({diet: [result.toJSON()]});
			}
			return Boom.notFound('Diet types not found');
		});
	}
}
