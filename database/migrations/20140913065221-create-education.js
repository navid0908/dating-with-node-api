var async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'education', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },
		      description: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'education', ['description'], ['High school']),
		db.insert.bind(db, 'education', ['description'], ['Two-year college']),
		db.insert.bind(db, 'education', ['description'], ['College/University']),
		db.insert.bind(db, 'education', ['description'], ['Masters']),
		db.insert.bind(db, 'education', ['description'], ['Law School']),
		db.insert.bind(db, 'education', ['description'], ['Med Schoo']),
		db.insert.bind(db, 'education', ['description'], ['PH.D Program'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('education', callback);
};