var dbHandler = require('../database'),
	Joi = require('joi');

exports.createUser = {
	tags: ['user', 'create'],
	description: "This creates a user on the system",
	validate: {
		payload: {
            type: Joi.string().min(3).max(20).required(),
            username: Joi.string().min(3).max(30),
            email: Joi.string().email().max(60),
            password: Joi.string().min(6).max(60)
        }
	},
	handler: function (request, reply) {
		//console.log(request.payload);
		dbHandler.db.models.user.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}
