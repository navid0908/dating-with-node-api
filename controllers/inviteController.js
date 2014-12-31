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
		// Have we reached a system max of the allowed number of invites ?
		models.Invitationcode.count().then(function (result){
			if(result && result >= config.invitation.systemMax ){
				return Promise.reject('No more invitations are allowed');
			}
		}).then(function (){
			// Has the user already been invited?
			return models.Invitation.findOne({email: request.payload.email}).then(function(result){
				if(result){
					return Promise.reject('That user has already been invited');
				}
			});
		}).then(function (){
			return models.Base.transaction(function (t) {
				var options = {};
				options.transacting = t;
				models.Invitationcode.add(options).then(function(invitationcode){
					invitationcode = invitationcode.toJSON();
					return {
						invitationcode_id:invitationcode.id,
						inviter_user_id:request.auth.credentials.user.id,
						email: request.payload.email
					};
				}).then(function(invitation){
					return models.Invitation.add(invitation,options);
				}).then(function (result){
					return t.commit();
				}).then(function(){
					return internals.sendInviteEmail(request);
				}).then(function(){
					return reply();
				}).catch(function (error) {
					t.rollback(error);
					return reply(Boom.badRequest(error));
				});
			});
		}).catch(function (error) {
			return reply(Boom.badRequest(error));
		});
	}
}