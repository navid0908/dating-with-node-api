var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'drink', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'drink', ['description'], ['Very often']),
		db.insert.bind(db, 'drink', ['description'], ['Often']),
		db.insert.bind(db, 'drink', ['description'], ['Socially']),
		db.insert.bind(db, 'drink', ['description'], ['Rarely']),
		db.insert.bind(db, 'drink', ['description'], ['Not at all'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('drink', callback);
};