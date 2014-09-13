var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'children', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'children', ['description'], ['Might want kids']),
		db.insert.bind(db, 'children', ['description'], ['Want kids']),
		db.insert.bind(db, 'children', ['description'], ['No thanks'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('children', callback);
};