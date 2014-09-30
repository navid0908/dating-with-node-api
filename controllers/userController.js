var dbHandler = require('../database'),
	Joi = require('joi'),
	Boom = require('boom'),
	Crypto = require('crypto');

// private functions that will not be exposed to rest calls.
var internals = {};

// Reserved usernames
//@TODO move this to a config file.
internals.reservedUsernames = {
    support: true,
    admin: true,
};

internals.supportedNetworks = {
    facebook: true,
    instagram: true,
    twitter: true,
    google: true,
    email: true,
};

internals.validateNetwork = function(type){
	if(!type){
		return reply(Boom.badRequest('Social network not supported'));
	}
}

internals.generateUsername = function (len){
	//http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
	 return Crypto.randomBytes(Math.ceil(len * 3 / 4))
	        .toString('base64')   // convert to base64 format
	        .slice(0, len)        // return required number of characters
	        .replace(/\+/g, '0')  // replace '+' with '0'
	        .replace(/\//g, '0'); // replace '/' with '0'
	}
exports.createUser = {
	tags: ['user', 'create'],
	description: "This creates a user on the system",
	validate: {
		payload: {
            network: Joi.string().min(3).max(20).required(),
            username: Joi.string().min(3).max(30),
            email: Joi.string().email().max(60),
            password: Joi.string().min(6).max(60)
        }
	},
	pre: [
	{
		assign: "isValidNetwork",
		method: function (request, reply){
			if (! internals.supportedNetworks[request.payload.network])
			{
				return reply(Boom.badRequest('Social Network is not supported.'));
			}
			reply(true);
		}
	},
	{
		assign: "isUsernameAllowed",
		method: function (request, reply){
			if (request.payload.username)
			{
				if( internals.reservedUsernames[request.payload.username])
				{
					return reply(Boom.conflict('Username is reserved.'));
				}
			}
			reply(true);
		}
	},
	{
		assign: "isUsernameTaken",
		method: function (request, reply){			
			if (request.payload.username){				
				return dbHandler.models.User.isUsernameTaken(request.payload.username, function (err, exists){					
					if (err){
						return reply(Boom.badRequest(err));
					}
					if(exists){
						return reply(Boom.conflict('Username is already taken.'));
					}else{
						return reply(true);
					}
				});
			}
			reply(true);
		}
	},
	{
		assign: "isEmailTaken",
		method: function (request, reply){
			if (request.payload.email){
				return dbHandler.models.User.isEmailTaken(request.payload.email, function (err, exists){					
					if (err){
						return reply(Boom.badRequest(err));
					}
					if(exists){
						return reply(Boom.conflict('Email is already registered. Please login'));
					}else{
						return reply(true);
					}
				});
			}
			reply(true);
		}
	}
	],
	handler: function (request, reply) {
		if(! request.payload.username)
		{
			console.log('username not passed, generating a new one');
		}
		request.payload.username = internals.generateUsername(12);
		return dbHandler.models.User.create(request.payload, function (err, user){
			if (err){
				return reply(Boom.badRequest(err));
			}			
			return reply(user);
		});
	}
}
