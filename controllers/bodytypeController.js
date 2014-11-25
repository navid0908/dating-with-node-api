var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'bodytype'],
	description: "Lookup for various body types",
	handler: function (request, reply) {
		models.Bodytype.findAll().then(function(result){
			if(result){
				return reply({bodytype: [result.toJSON()]});
			}
			return Boom.notFound('Body types not found');
		});		
	}
}
