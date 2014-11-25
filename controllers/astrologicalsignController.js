var models = require('../database');
var	Boom = require('boom');

exports.get = {
	tags: ['lookup', 'astrologicalsign'],
	description: "Lookup for various astrological signs",
	handler: function (request, reply) {		
		models.Astrologicalsign.findAll().then(function(result){
			if(result){
				return reply({astrologicalsign: [result.toJSON()]});				
			}
			return Boom.notFound('Astrological Signs not found');			
		});
	}
}
