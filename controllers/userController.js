var dbHandler = require('../database');
var	Joi = require('joi');
var	Boom = require('boom');
var	Crypto = require('crypto');
var async = require('async');
var config = require('../config/config');

// private internal functions
var internals = {};

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
            network: Joi.string().valid(config.login.validNetworks).required(),
            username: Joi.string().min(3).max(30),
            email: Joi.string().email().max(60),
            password: Joi.string().min(6).max(60)
        }
	},
	pre: [
	{
		assign: "isUsernameAllowed",
		method: function (request, reply){
			var reservedUsernames = Object.keys(config.registration.reservedUsernames);
			if (reservedUsernames.indexOf(request.payload.username) > -1){
				return reply(Boom.conflict('Username is reserved.'));
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
		async.auto({
            user : function (done) {
				if(! request.payload.username){
					request.payload.username = internals.generateUsername(12);
				}
				if (request.payload.network == 'email'){
					dbHandler.models.User.createAccount(
						request.payload.username,
						request.payload.email,
						request.payload.password,
						done
					);
				}else{
					//@TODO: register via social network and pull information.
				}
			},
			welcome : function(done){
				//@TODO: send welcome email to them.
				//@TODO: break this out into its own component/plugin.
				done(null,{});
			}
		},function (err, results) {
                if (err){
					return reply(Boom.badRequest(err));
				}
                return reply(results.user);
			}
		);
	}
};
