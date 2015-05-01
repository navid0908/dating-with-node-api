var models = require('../database');
var Joi = require('joi');
var	Boom = require('boom');

// private internal functions
var internals = {};

exports.get = {
	tags: ['photos', 'user', 'get'],
	description: "This gets photos for a given user on the system",
	auth: 'session',
	validate: {
		query: {
			id : Joi.number().min(1),
		}
	},
	handler: function (request, reply) {
		if(request.query.id){
			return models.User.forge({id: request.query.id}).photos().fetch().then(function(photos) {
				reply({photos:photos.toJSON()});
			}).catch(function(err) {
				return reply(Boom.notFound('User profile not found'));
			});
		}else{
			return reply(Boom.notFound('User id not provided'));
		}
	}
};