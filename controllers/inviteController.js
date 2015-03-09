var models = require('../database');
var	Joi = require('joi');
var	Boom = require('boom');
var Promise = require('bluebird');
var config = require('../config/config');
var _ = require('lodash');

// private internal properties/functions
var internals = {};

internals.sendInviteEmail = function(request){
	return models.User.findOne({id: request.auth.credentials.user.id}).then(function(result){
		if(result){			
			result = result.toJSON();
			var payload = {
					to: [{
						email: request.payload.email,
						type: "to",
					}],
					subject: result.username
				};
				
			_.merge(payload, config.mail[0].invite);
			return request.server.plugins.mailer.mandrill_client.messages.send({"message": payload, async:true}, function(result) {
				return result;
			});
		}
	});	
};
internals.getUserMax = function(user_id){
	return models.Setting.findBySettingName({
			user_id: user_id,
			name: models.Setting.CONST_USER_MAX_INVITE
		}).then(function(value){
			return parseInt(value) || config.invitation.userMax;
		});
}

exports.invite = {
	tags : ['invite'],
	description : 'Allow members to invite other users to the system',
	auth: 'session',
	validate: {
		payload : {
			email: Joi.string().email().max(60),
		}
	},
	handler : function (request, reply){
		internals.getUserMax(1)
		// Have we reached a system max of the allowed number of invites ?
		return models.Invitation.count().then(function (result){
			if(result >= config.invitation.systemMax ){
				return Promise.reject('No more invitations are allowed');
			}
		}).then(function (){
			// Have we reached a user max of the allowed number of invites?
			return models.Invitation.countOfInvitesSent(request.auth.credentials.user.id).then(function(result){
				if(result >= config.invitation.userMax){
					return Promise.reject('No more invitations are allowed for this user');
				}
			});
		}).then(function (){
			// Has the user already been invited?
			return models.Invitation.findOne({email: request.payload.email}).then(function(result){
				if(result){
					return Promise.reject('That user has already been invited');
				}
			});
		}).then(function (){
			var data = {
				email:request.payload.email,
				user_id:request.auth.credentials.user.id
			}
			return models.Invitation.add(data)
		}).then(function (invitation){
			return internals.sendInviteEmail(request);
		}).then(function(){
			return reply();
		}).catch(function (error) {
			return reply(Boom.badRequest(error));
		});
	}
}