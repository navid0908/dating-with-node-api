var models = require('../database');
var	Joi = require('joi');
var	Boom = require('boom');
var	Crypto = require('crypto');
var async = require('async');
var Promise = require('bluebird');
var config = require('../config/config');
var _ = require('lodash');

// private internal properties/functions
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

internals.sendWelcomeEmail = function(request, userData){
	var mailer = request.server.plugins.mailer;
	var payload = {
			to: [{
				email: request.payload.email,
				type: "to"
			}]
		};
	_.extend(payload,config.mail[0].welcome);
	return mailer.mandrill_client.messages.send({"message": payload, async:true}, function(result) {
		return result;
	});
};
internals.sendUpdateEmail = function(request, userData){
	var mailer = request.server.plugins.mailer;
	var payload = {
			to: [{
				email: userData.email,
				type: "to"
			}]
		};
	_.extend(payload,config.mail[0].update);
	return mailer.mandrill_client.messages.send({"message": payload, async:true}, function(result) {
		return result;
	});
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
			if(request.auth.credentials.user && request.params.id != request.auth.credentials.user.id ){
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
		var user;
		models.User.findOne({id: request.auth.credentials.user.id}).then(function (userRecord) {
			if(userRecord){
				return userRecord;
			}
			return Promise.reject('Unable to find user record.');
		}).then(function (userRecord) {
			if(request.payload.username && request.payload.username != userRecord.get('username')){
				//they entered a username that is different from their logged in username.
				//make sure its unique.
				return models.User.isUsernameUnique(request.payload.username).then(function (isUnique) {
					return userRecord
				}).catch(function (error) {
					//'email is already taken'
					return Promise.reject(error);
				});
			}
			return userRecord;
		}).then(function (userRecord) {
			if(request.payload.email && request.payload.email != userRecord.get('email')){
				//they entered an email that is different from their logged in email.
				//make sure its unique.
				return models.User.isEmailUnique(request.payload.email).then(function (isUnique) {
					return userRecord
				}).catch(function (error) {
					//'email is already taken'
					return Promise.reject(error);
				});
			}
			return userRecord;
		}).then(function (userRecord) {
			if(request.payload.username){
				userRecord.set('username', request.payload.username);
			}
			if(request.payload.email){
				userRecord.set('email', request.payload.email);
			}
			return userRecord.save();
		}).then(function (userRecord) {
			user = userRecord.toJSON();
			return internals.sendUpdateEmail(request, user);
		}).then(function () {
            return reply ({user: [user]});
        }).catch(function (error) {
			return reply(Boom.conflict(error));
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
            password: Joi.string().min(6).max(60),
            invitationcode: Joi.string().min(6).max(60).required(),
        }
	},
	pre: [
	{
		assign: "isUsernameReserved",
		method: internals.isUsernameReserved
	},
	{
		assign: "isUsernameUnique",
		method: function (request, reply){
				if (request.payload.username){
					models.User.isUsernameUnique(request.payload.username).then(function (isExist) {
						return reply();
					}).catch(function (error) {
						//'Username is already taken'
						return reply(Boom.conflict(error));
					});
				}
				return reply();
		}
	},
	{
		assign: "isEmailUnique",
		method: function(request, reply){
			if (request.payload.email){
				models.User.isEmailUnique(request.payload.email).then(function (isExist) {
					return reply();
				}).catch(function (error) {
					//'email is already taken'
					return reply(Boom.conflict(error));
				});
			}
		}
	},
	{
		assign: "isInvitationcodeValid",
		method: function(request, reply){
			return models.Invitation.findByInvitationCode(request.payload.invitationcode).then(function(invitation){
					if(!invitation){ //we could not locate the invitation code they entered.
						return reply(Boom.conflict('Invalid invitation code'));
					}
					if(invitation && invitation.isUsed()){ //this invitation code was already used.
						return reply(Boom.conflict('Invalid invitation code'));
					}
					return reply();
				});
		}
	},
	],
	handler: function (request, reply) {
		var data;
		var user;
		var options = {};

		if(request.payload.network == 'email' && !request.payload.email){
			//If they failed to provide an email address during registration.
			return reply(Boom.badRequest('email is required'));
		}

		if(! request.payload.username){
			request.payload.username = internals.generateUsername(12);
		}

		data = {	username: request.payload.username,
					email: request.payload.email.toLowerCase(),
					password: request.payload.password,
					network: request.payload.network
			};

		return models.Invitation.findByInvitationCode(request.payload.invitationcode).then(function(invitationRecord){
			return models.Base.transaction(function (t) {
					options.transacting = t;
					invitationRecord.markUsed().save(null,options).then(function (invitationRecord){
						return models.User.add(data,options);
					}).then(function (userRecord){
						user = userRecord.toJSON();
						return internals.sendWelcomeEmail(request, user);
					}).then(function (){
						return t.commit();
					}).then(function (){
						return reply ({user: [user]});
					}).catch(function (error) {
						t.rollback(error);
						return reply(Boom.badRequest(error));
					});
				});
			});
	}
};
