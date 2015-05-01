var	models = require('../database');
var Joi = require('joi');
var	Boom = require('boom');
var	Promise = require('bluebird');
var	config = require('../config/config');
var	_ = require('lodash');

// private internal properties/functions
var internals = {};

exports.get = {
	tags: ['profile', 'user', 'get'],
	description: "This gets a user profile on the system",
	auth: 'session',
	validate: {
		query: {
			id : Joi.number().min(1),
		}
	},
	handler: function (request, reply) {
		if(request.query.id){
			return models.Profile.findOne({user_id: request.query.id}).then(function(result){
				if(result){
					return reply ({profile: [result.toJSON()]});
				}else{
					return reply(Boom.notFound('User profile not found'));
				}
			});
		}else{
			return reply(Boom.notFound('User id not provided'));
		}
	}
};

exports.update = {
	tags: ['profile', 'user', 'update'],
	description: "This updates a user on the system",
	auth: 'session',
	validate: {
		payload: {
			bodytype: Joi.number().min(1),
			diet: Joi.number().min(1),
			smoke: Joi.number().min(1),
			drug: Joi.number().min(1),
			drink: Joi.number().min(1),
			education: Joi.number().min(1),
			children: Joi.number().min(1),
			activelevel: Joi.number().min(1),
			astrologicalsign: Joi.number().min(1),
			profession: Joi.number().min(1),
			relationshipstatus: Joi.number().min(1),
			height: Joi.number().precision(2).min(91).max(213), //3feet - 7feet.
			gender: Joi.any().valid(['m','f']),
			orientation: Joi.any().valid(['s','g', 'b']),
			birthday:Joi.date().min(config.profile.birthday_min).max(config.profile.birthday_max)
		}
	},
	pre: [{
		assign: "isValidMaxLength",
		method: function (request, reply){
			var current = Promise.resolve();

			if(request.payload.bodytype){
				current = models.Bodytype.count().then(function (result){
					if(request.payload.bodytype > result){
						return Promise.reject('Bodytype is not in valid range.');
					}
					return Promise.resolve(result);
				});
			}
			current.then(function(){
				if(request.payload.diet){
					return models.Diet.count().then(function (result){
						if(request.payload.diet > result){
							return Promise.reject('Diet is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			})
			.then(function(){
				if(request.payload.smoke){
					return models.Smoke.count().then(function (result){
						if(request.payload.smoke > result){
							return Promise.reject('Smoke is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.drug){
					return models.Drug.count().then(function (result){
						if(request.payload.drug > result){
							return Promise.reject('Drug is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.drink){
					return models.Drink.count().then(function (result){
						if(request.payload.drink > result){
							return Promise.reject('Drink is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.education){
					return models.Education.count().then(function (result){
						if(request.payload.education > result){
							return Promise.reject('Education is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.children){
					return models.Children.count().then(function (result){
						if(request.payload.children > result){
							return Promise.reject('Children is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.activelevel){
					return models.Activelevel.count().then(function (result){
						if(request.payload.activelevel > result){
							return Promise.reject('Activelevel is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.astrologicalsign){
					return models.Astrologicalsign.count().then(function (result){
						if(request.payload.astrologicalsign > result){
							return Promise.reject('Astrologicalsign is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.profession){
					return models.Profession.count().then(function (result){
						if(request.payload.profession > result){
							return Promise.reject('Profession is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				if(request.payload.relationshipstatus){
					return models.Relationshipstatus.count().then(function (result){
						if(request.payload.relationshipstatus > result){
							return Promise.reject('Relationshipstatus is not in valid range.');
						}
						return Promise.resolve(result);
					});
				}
			}).then(function(){
				reply();
			})
			.catch(function (error) {
				reply(Boom.badRequest(error));
			});
		}
	}],
	handler: function (request, reply) {
		models.User.findOne({id: request.auth.credentials.user.id}).then(function (userRecord) {
			if(userRecord){
				return userRecord;
			}
		}).then(function (userRecord) {
			return models.Profile.findOne({user_id: userRecord.get('id')});
		}).then(function (profileRecord) {
			if(profileRecord){
				return profileRecord;
			}
			return models.Profile.forge({user_id:request.auth.credentials.user.id});
		}).then(function (profileRecord) {
			if(profileRecord && !profileRecord.get('user_id')){
				profileRecord.set('user_id', request.auth.credentials.user.id);
			}
			if(request.payload.bodytype){
				profileRecord.set('bodytype_id', request.payload.bodytype);
			}
			if(request.payload.diet){
				profileRecord.set('diet_id', request.payload.diet);
			}
			if(request.payload.smoke){
				profileRecord.set('smoke_id',request.payload.smoke);
			}
			if(request.payload.drug){
				profileRecord.set('drug_id',request.payload.drug);
			}
			if(request.payload.drink){
				profileRecord.set('drink_id',request.payload.drink);
			}
			if(request.payload.education){
				profileRecord.set('education_id',request.payload.education);
			}
			if(request.payload.children){
				profileRecord.set('children_id',request.payload.children);
			}
			if(request.payload.activelevel){
				profileRecord.set('activelevel_id',request.payload.activelevel);
			}
			if(request.payload.astrologicalsign){
				profileRecord.set('astrologicalsign_id',request.payload.astrologicalsign);
			}
			if(request.payload.profession){
				profileRecord.set('profession_id', request.payload.profession);
			}
			if(request.payload.relationshipstatus){
				profileRecord.set('relationshipstatus_id',request.payload.relationshipstatus);
			}
			if(request.payload.height){
				profileRecord.set('height',request.payload.height);
			}
			if(request.payload.gender){
				profileRecord.set('gender',request.payload.gender.toLowerCase());
			}
			if(request.payload.orientation){
				profileRecord.set('orientation',request.payload.orientation.toLowerCase());
			}
			if(request.payload.birthday){
				profileRecord.set('birthday',request.payload.birthday);
			}
			return profileRecord.save(null);
		}).then(function (profileRecord) {
			return reply ({profile: [profileRecord.toJSON()]});
        }).catch(function (error) {
			return reply(Boom.conflict(error));
		});
	}
};
exports.updateAnswer = {
	tags: ['profile', 'user', 'update', 'answer'],
	description: "This updates a user's answers on his profile.",
	auth: 'session',
	validate: {
		payload: {
			id: Joi.number().min(1).required(),
			answer: Joi.string().min(1).required(),
		}
	},
	pre: [{
		assign: "isValidMaxLength",
		method: function (request, reply){
			models.Question.count().then(function (result){
				if(request.payload.id > result){
					return Boom.badRequest('Question id is not in valid range.');
				}
				return reply();
			});
		}}
	],
	handler: function (request, reply) {
		var profile = null;
		models.Profile.findOne({user_id: request.auth.credentials.user.id}).then(function (profileRecord) {
			if(profileRecord){
				return profileRecord;
			}
			return models.Profile.forge({user_id: request.auth.credentials.user.id}).save(null);
		}).then(function (profileRecord) {
			profile = profileRecord;
			return models.Profileanswer.findOne({profile_id: profileRecord.get('id')});
		}).then(function (profileAnswerRecord) {
			if(profileAnswerRecord){
				return profileAnswerRecord;
			}
			return models.Profileanswer.forge({profile_id: profile.get('id')});
		}).then(function (profileAnswerRecord) {
			profileAnswerRecord.set('question_id', request.payload.id);
			profileAnswerRecord.set('answer', request.payload.answer);
			return profileAnswerRecord.save(null);
		}).then(function (profileAnswerRecord) {
			return reply ({profileanswer: [profileAnswerRecord.toJSON()]});
        }).catch(function (error) {
			return reply(Boom.conflict(error));
		});
	}
};