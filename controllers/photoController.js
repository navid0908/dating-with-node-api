var models = require('../database');
var Joi = require('joi');
var	Boom = require('boom');
var	Promise = require('bluebird');
var fs = require('fs');
var uuid = require('node-uuid');
var	config = require('../config/config');

// private internal functions
var internals = {};

exports.get = {
	tags: ['photos', 'user', 'get'],
	description: "This gets photos for a given user on the system",
	auth: 'session',
	validate: {
		params: {
			username : Joi.string().min(1).max(30),
		}
	},
	handler: function (request, reply) {
		var current = Promise.resolve();
		if(request.params.username){
			models.User.findOne({username: request.params.username}).then(function(user) {
				if(user){
					// return models.Photo.findAll({user_id: user.get('id')});
					return user.photos().fetch();
				}
				return Promise.reject('User not found');
			}).then(function(collection){
				if (collection && collection.length > 0){
					return reply({photos:collection.toJSON()});
				}
				return Promise.reject('User has no photos');
			}).catch(function(err) {
				return reply(Boom.notFound(err));
			});
		}else{
			return reply(Boom.notFound('username not provided'));
		}
	}
};

exports.add = {
	tags: ['photos', 'user', 'add'],
	description: "This adds a photo for a given user on the system",
	auth: 'session',
	payload: {
		maxBytes: 1024 * 1024 * 10, // 1B (1024) * 1K (1024) = 1MB * 10 = 10mb
		output: 'stream', // We need to pipe the file to S3
		parse: true
	},
	validate: {
		payload: {
			id : Joi.number().integer().min(1),
			primary: Joi.number().integer().min(0).max(1),
			caption: Joi.string().min(1).max(140),
			file: Joi.object({
				hapi: Joi.object({
					headers: Joi.object({
						'content-type' : Joi.string().valid(['image/jpeg']).required(),
					})
				})
			}).options({ allowUnknown: true })
		}
	},
	handler: function (request, reply) {
		if(request.payload.file){
			var current = Promise.resolve();

			// Create a new uuid so that there is no naming collision
			var newFilename = config.general.public_upload_path + uuid.v1() + '.jpg';

			// Set the location for the file to be placed.
			var fileOut = fs.createWriteStream(newFilename);

			request.payload.file.pipe(fileOut);

			request.payload.file.on('error', function(err){
				return reply(Boom.badRequest('Unable to save photo to drive.'));
			});
			request.payload.file.on('end', function(err){
				current.then(function(){
					return models.Photo.forge({user_id: request.auth.credentials.user.id});
				}).then(function(photo){
					if (request.payload.caption){
						photo.set('caption', request.payload.caption);
					}
					if (request.payload.primary){
						photo.set('is_primary', request.payload.primary);
					}
					if (request.payload.primary){
						photo.set('filepath', newFilename);
					}
					return photo.save(null);
				}).then(function(photo){
					reply({photo: photo.toJSON()});
				})
			});
		}
	}
};

exports.update = {
	tags: ['photos', 'user', 'update'],
	description: "This updates a photo for a given user on the system",
	auth: 'session',
	validate: {
		payload: {
			primary: Joi.any().valid(0,1),
			caption: Joi.string().min(1).max(140),
		}
	},
	handler: function (request, reply) {
		if(request.params.id){
			return models.Photo.forge({id: request.params.id}).fetch().then(function(photo) {
				if (photo){
					if (request.payload.primary){
						photo.set('is_primary', request.payload.primary);
						if(request.payload.primary == 1){
							photo.unsetOldPrimaryPhoto();
						}
					}
					if (request.payload.caption){
						photo.set('caption', request.payload.caption);
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