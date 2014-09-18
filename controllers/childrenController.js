var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'children'],
	description: "Lookup for children",
	handler: function (request, reply) {
		dbHandler.db.models.children.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}