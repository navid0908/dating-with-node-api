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
			var emailAddress = request.payload.email;
			var ipAddress = (request.info.remoteAddress) ? request.info.remoteAddress : ' ';
			models.Authattempt.findByEmailIpaddress(emailAddress, ipAddress, function(error, collection){
				if(error){
					return reply(Boom.badRequest(error));
				}
				if(collection.length >=config.login.maxAllowedAttempts){
					return reply(Boom.badRequest('Maximum number of attempts reached.'));
				}
				reply();
			});
		}
	},{
		assign: 'user',
		method: function(request, reply){
			var emailAddress = request.payload.email;
			var password = request.payload.password;
			models.User.findByCredentials(emailAddress, password, function(error, user){
				if(error){
					return reply(Boom.badRequest(error));
				}
				//if a valid record is not found, user will be undefined.
				reply(user);
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
			var emailAddress = request.payload.email;
			var ipAddress = (request.info.remoteAddress) ? request.info.remoteAddress : ' ';
			models.Authattempt.createEntry(emailAddress, ipAddress, function(error, model){
				if(error){
					return reply(Boom.badRequest(error));
				}
				//@TODO: check for account status.
				return reply(Boom.badRequest('Email and password combination do not match.'));
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
			models.User.findBySocialCredentials(request.auth.credentials.provider, request.auth.credentials.profile.raw.id, function(error, user){
				if(error){
					return reply(Boom.badRequest(error));
				}
				//we found a user
				reply(user);
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