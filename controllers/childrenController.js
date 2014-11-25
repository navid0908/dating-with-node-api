var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'children'],
	description: "Lookup for children",
	handler: function (request, reply) {
		models.Children.findAll().then(function(result){
			if(result){
				return reply({children: [result.toJSON()]});
			}
			return Boom.notFound('Children types not found');
		});
	}
}
