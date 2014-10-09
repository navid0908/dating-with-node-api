var dbHandler = require('../database');
var async = require('async');
var config = require('../config/config');
var	Boom = require('boom');

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
	pre: [{
		assign: 'isLoggedin',
		method: function(request, reply){
			if (request.auth.isAuthenticated) {
				return reply.redirect('/');
			}
			reply();
		}
	},
	{
		assign: 'isLoginAbuse',
		method: function(request, reply){
			var emailAddress = request.payload.email;
			var ipAddress = request.info.remoteAddress;
			dbHandler.models.Authattempt.findByEmailIpaddress(emailAddress, ipAddress, function(error, collection){
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
			dbHandler.models.User.findByCredentials(emailAddress, password, function(error, user){
				if(error){
					return reply(Boom.badRequest(error));
				}
				reply(user);
			});
		}
	},{
		assign: 'logAttempt',
		method: function(request, reply){
			// credentials are valid, create session.
			if (request.pre.user){
				return reply();
			}
			// credentials are NOT valid, log user attempt.
			var emailAddress = request.payload.email;
			var ipAddress = request.info.remoteAddress;
			dbHandler.models.Authattempt.createEntry(emailAddress, ipAddress, function(error, model){
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
    	return reply.redirect('/');
	}
};
exports.logout = {
	tags: ['auth', 'logout'],
	description: "App logut and remove session",
	auth: 'session',
	handler: function (request, reply) {
		request.auth.session.clear();
		return reply.redirect('/');
	}
};
exports.facebook = {
	tags: ['auth', 'social login', 'facebook'],
	description: "App login via facebook",	
	auth: 'facebook',
    handler: function (request, reply) {
		// Perform any account lookup or registration, setup local session,
        // and redirect to the application. The third-party credentials are
        // stored in request.auth.credentials. Any query parameters from
        // the initial request are passed back via request.auth.credentials.query.
        //return reply.redirect('/home');				
        return reply([]);
    }
};