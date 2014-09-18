var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'education'],
	description: "Lookup for various education levels",
	handler: function (request, reply) {
		dbHandler.db.models.education.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}