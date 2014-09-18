var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'drug'],
	description: "Lookup for various drug habbits",
	handler: function (request, reply) {
		dbHandler.db.models.drug.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}