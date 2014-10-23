var dbHandler = require('../database');
var	Joi = require('joi');
var	Boom = require('boom');
var	Crypto = require('crypto');
var async = require('async');
var config = require('../config/config');
var _ = require('underscore');

// private internal functions
var internals = {};

internals.generateUsername = function (len){
	//http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
	 return Crypto.randomBytes(Math.ceil(len * 3 / 4))
	        .toString('base64')   // convert to base64 format
	        .slice(0, len)        // return required number of characters
	        .replace(/\+/g, '0')  // replace '+' with '0'
	        .replace(/\//g, '0'); // replace '/' with '0'
};

internals.isUsernameReserved = function (request, reply){
	if (request.payload.username){
		var reservedUsernames = Object.keys(config.registration.reservedUsernames);
		if (reservedUsernames.indexOf(request.payload.username) > -1){
			return reply(Boom.conflict('Username is reserved.'));
		}
	}
	reply();
};
internals.isUsernameTaken = function (request, reply){
	if (request.payload.username){
		dbHandler.models.User.isUsernameTaken(request.payload.username, function (err, exists){
			if (err){
				reply(Boom.conflict('Username is already taken.'));
			}else{
				reply();
			}
		});
	}else{
		reply();
	}
};

internals.isEmailTaken = function (request, reply){
	if (request.payload.email){
		dbHandler.models.User.isEmailTaken(request.payload.email, function (err, exists){
			if (err){
				reply(Boom.conflict('Email is already registered. Please login'));
			}else{
				reply();
			}
		});
	}else{
		reply();
	}
};

exports.update = {
	tags: ['user', 'update'],
	description: "This updates a user on the system",
	auth: 'session',
	validate: {
		payload: {
            username: Joi.string().min(3).max(30),
            email: Joi.string().email().max(60),
            password: Joi.string().min(6).max(60),
            password2: Joi.string().min(6).max(60),
        }
	},
	pre: [{
		assign: "isValidUser",
		method: function (request, reply){
			if(request.params.id != request.auth.credentials.id ){
				reply(Boom.conflict('User id being updated is not the authenticated user'));
			}else{
				reply();
			}
		}
	},{
		assign: "isUsernameReserved",
		method: internals.isUsernameReserved
	}],
	handler: function (request, reply) {
		async.auto({
			user: function (done) {
				dbHandler.models.User.find({id:request.auth.credentials.id}, function(err, model){
					if (err){
						done('Unable to find user record');
					}else{
						done(null,model);
					}
				});
			},
			usernameCheck : ['user', function (done, results) {
				if(request.payload.username && request.payload.username != results.user.get('username')){
					//they entered a username that is different from their logged in username.
					//make sure its unique.
					dbHandler.models.User.isUsernameTaken(request.payload.username, done);
				}else{
					done();
				}
			}],
			emailCheck : ['user', 'usernameCheck', function (done, results) {
				if(request.payload.email && request.payload.email != results.user.get('email')){
					//they entered a new email that is different from their logged in email.
					//make sure its unique.
					dbHandler.models.User.isEmailTaken(request.payload.email, done);
				}else{
					done();
				}
            }],
            passwordHash : ['emailCheck', function (done, results) {
				if( (request.payload.password && !request.payload.password2) || (request.payload.password2 && !request.payload.password)){
					done('Password and/or Password 2 are missing');
				}
				if(request.payload.password && (request.payload.password != request.payload.password2)) {
					done('Password and Password 2 do not match');
				}
				if(request.payload.password){
					dbHandler.models.User.generatePasswordHash(request.payload.password, done);
				}else{
					done();
				}
            }]
        }, function (err, results) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
			if(request.payload.username){
				results.user.set('username', request.payload.username);
			}
			if(request.payload.email){
				results.user.set('email', request.payload.email);
			}
			if(results.passwordHash){
				results.user.set('password', results.passwordHash.hash);
			}
			results.user.save(results.user.changed, { patch: true }).then(function(model){
				// Send profile update email to them
				var mailer = request.server.plugins.mailer;
				var messagePayload = {"to": [{"email": model.get('email'),"type": "to"}]};
				_.extend(messagePayload,config.mail[0].password_reset);
				mailer.mandrill_client.messages.send({"message": messagePayload, async:true}, function(result){});
				request.auth.session.set(model);
				reply([]);
			});
		});
	}
};
exports.signUp = {
	tags: ['user', 'signup'],
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
		assign: "isUsernameReserved",
		method: internals.isUsernameReserved
	},
	{
		assign: "isUsernameTaken",
		method: internals.isUsernameTaken
	},
	{
		assign: "isEmailTaken",
		method: internals.isEmailTaken
	},
	],
	handler: function (request, reply) {
		if(request.payload.network == 'email' && !request.payload.email){
			//If they failed to provide an email address during registration.
			return reply(Boom.badRequest('email is required'));
		}
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
				// Send welcome email to them.
				var mailer = request.server.plugins.mailer;
				var messagePayload = {"to": [{"email": request.payload.email,"type": "to"}]};
				_.extend(messagePayload,config.mail[0].welcome);
				mailer.mandrill_client.messages.send({"message": messagePayload, async:true}, function(result) {
					done();
				});
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
