var models = require('../database');
var Joi = require('joi');
var	Boom = require('boom');
var	Promise = require('bluebird');

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
				if (photos && photos.length > 0){
					return reply({photos:photos.toJSON()});
				}
				return Promise.reject('User profile not found');
			}).catch(function(err) {
				return reply(Boom.notFound(err));
			});
		}else{
			return reply(Boom.notFound('User id not provided'));
		}
	}
};

exports.update = {
	tags: ['photos', 'user', 'update'],
	description: "This updates a photo for a given user on the system",
	auth: 'session',
	validate: {
		payload: {
			id : Joi.number().min(1),
			primary: Joi.any().valid(0,1),
			caption: Joi.string().min(1).max(140),
			image: [Joi.string(), Joi.number()],
		}
	},
	handler: function (request, reply) {
		if(request.payload.id){
			return models.Photo.forge({id: request.payload.id}).fetch().then(function(photo) {
				if (photo && photo.length > 0){
					if (request.payload.primary){
						photo.set('is_primary', request.payload.primary);
					}
					if (request.payload.caption){
						photo.set('caption', request.payload.caption);
					}
					if (request.payload.image){
						//@TODO:Needs to be implemented
						return Promise.reject('Needs to be implemented');
					}
					return photo.save(null);
				}
				return Promise.reject('User photo not found');
			}).then(function(photo) {
				return reply({photo:photo.toJSON()});
			}).catch(function(err) {
				return reply(Boom.notFound(err));
			});
		}else{
			return reply(Boom.notFound('Photo id not provided'));
		}
	}
};