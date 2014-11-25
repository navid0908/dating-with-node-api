var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'activelevel'],
	description: "Lookup for various active levels",
	handler: function (request, reply) {
		models.Activelevel.findAll().then(function(result){
			if(result){
				return reply({activelevel: [result.toJSON()]});
			}
			return Boom.notFound('Active levels not found');
		});
	}
}
