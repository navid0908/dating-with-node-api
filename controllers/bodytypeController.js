var dbHandler = require('../database');	

exports.get = {
	tags: ['lookup', 'bodytype'],
	description: "Lookup for various body types",
	handler: function (request, reply) {
		dbHandler.db.models.bodytype.find().all(function (err, rows) {
            var items = rows.map(function (m) {
                return m.serialize();
            });
            reply(items);
        });
	}
}
