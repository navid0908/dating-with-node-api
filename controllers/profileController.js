var	models = require('../database');
var Joi = require('joi');
var	Boom = require('boom');
var	Crypto = require('crypto');
var	async = require('async');
var	Promise = require('bluebird');
var	config = require('../config/config');
var	_ = require('lodash');

// private internal properties/functions
var internals = {};

exports.update = {
	tags: ['profile', 'user', 'update'],
	description: "This updates a user on the system",
	auth: 'session',
	validate: {
		payload: {
            gender: Joi.any().valid(['m','f']),
            orientation: Joi.any().valid(['s','g', 'b']),
            birthday:Joi.date().min(config.profile.birthday_min).max(config.profile.birthday_max),
            bodytype: Joi.number().min(1).max(10)
        }
	},	
	handler: function (request, reply) {
		reply();
	}
};