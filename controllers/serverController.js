var models = require('../database');
var config = require('../config/config');
var	Boom = require('boom');
var	Joi = require('joi');

// private internal functions
var internals = {};

exports.status = {
	tags: ['server', 'status'],
	description: "Is Alive",
	handler: function (request, reply) {
		var d = new Date();
		return reply(d.getTime());
	}
};
