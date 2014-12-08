var models = require('../database');
var async = require('async');
var config = require('../config/config');
var	Boom = require('boom');
var	Joi = require('joi');

// private internal functions
var internals = {};

exports.login = {
	tags: ['auth', 'login'],
	description: "App login endpoint with cookie session init",
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	plugins: {
		'hapi-auth-cookie': {
			redirectTo: false
		}
	},
	validate: {
		payload: {
            network: Joi.string().valid(config.login.validNetworks).required(),
            email: Joi.string().email().max(60),
            password: Joi.string().min(6).max(60)
        }
	},
	pre: [{
		assign: 'isLoggedin',
		method: function(request, reply){
			if (request.auth.isAuthenticated) {
				//return reply.redirect('/');
			}
			reply();
		}
	},{
		assign: 'isLoginAbuse',
		method: function(request, reply){
			var emailAddress = request.payload.email.toLowerCase();
			var ipAddress = (request.info.remoteAddress) ? request.info.remoteAddress : ' ';
			models.Authattempt.findAll({email:emailAddress, ip:ipAddress}).then(function(collection){
				if(!collection){
					return reply();
				}
				if(collection.length >= config.login.maxAllowedAttempts){
					return reply(Boom.badRequest('Maximum number of attempts reached.'));
				}
				return reply();
			}).catch(function(error){
				if(error){
					return reply(Boom.badRequest(error));
				}
			});
		}
	},{
		assign: 'user',
		method: function(request, reply){
			var emailAddress = request.payload.email.toLowerCase();
			var password = request.payload.password;
			models.User.findByCredentials({email: emailAddress, password:password}).then(function (userRecord) {
	            if(userRecord){
	                return reply ({user: [userRecord.toJSON()]});
	            }
	            return reply();
	        }).catch(function(error){
				if(error){
					//@TODO: log db error ?
				}
				return reply();
			});
		}
	},{
		assign: 'logAttempt',
		method: function(request, reply){
			// credentials are valid, and a user object was returned, so let's create a session.
			if (request.pre.user){
				return reply();
			}
			// credentials are NOT valid, log user attempt.
			var emailAddress = request.payload.email.toLowerCase();
			var ipAddress = (request.info.remoteAddress) ? request.info.remoteAddress : ' ';
			return models.Authattempt.add({email:emailAddress, ip:ipAddress}).then(function(result){
				//@TODO: check for account status.
				return reply(Boom.badRequest('Email and password combination do not match.'));
			}).catch(function (error) {
				if(error){
					//@TODO: log db error ?
				}
				return reply(Boom.badRequest(error));
			});
		}
	}],
	handler: function (request, reply) {
		request.auth.session.set(request.pre.user);
		return reply([]);
	}
};
exports.logout = {
	tags: ['auth', 'logout'],
	description: "App logut and remove session",
	auth: 'session',
	handler: function (request, reply) {
		request.auth.session.clear();
		return reply([]);
	}
};
exports.facebook = {
	tags: ['auth', 'social login', 'facebook'],
	description: "App login via facebook",	
	auth: 'facebook',
	pre: [
	{
		assign: 'isLoggedin',
		method: function(request, reply){
			//check to see if a session exists or if they approved social login.
			if (request.auth.isAuthenticated) {
				return reply.redirect('/');
			}
			reply();
		}
	},
	{
		assign: 'user',
		method: function(request, reply){
			var payload = {
					network:request.auth.credentials.provider,
					token:request.auth.credentials.profile.raw.id
				};
			return models.findOne(payload).then(function (userRecord) {
	            if(userRecord){
	                return reply ({user: [userRecord.toJSON()]});
	            }
	            return reply(Boom.badRequest(error));
	        });
		}
	},
	],
    handler: function (request, reply) {
		if (request.pre.user){
			return reply.redirect('/');
		}else{
			return reply(Boom.badRequest('Please register.'));
		}
		// console.log('request method: ' + request.method);
		// console.log('request.auth');
		// console.log(request.auth);
		// console.log('request.auth.credentials.profile.raw');
		// console.log(request.auth.credentials.profile.raw.id);
    }
};