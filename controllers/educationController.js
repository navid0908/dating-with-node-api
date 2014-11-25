var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'education'],
	description: "Lookup for various education levels",
	handler: function (request, reply) {
		models.Education.findAll().then(function(result){
			if(result){
				return reply({education: [result.toJSON()]});
			}
			return Boom.notFound('Education types not found');
		});
	}
}
