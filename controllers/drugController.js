var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'drug'],
	description: "Lookup for various drug habbits",
	handler: function (request, reply) {
		models.Drug.findAll().then(function(result){
			if(result){
				return reply({drug: [result.toJSON()]});
			}
			return Boom.notFound('Drug types not found');
		});
	}
}
