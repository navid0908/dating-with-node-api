var dbm = require('db-migrate'),
	type = dbm.dataType,
	async = require('async');

exports.up = function (db, callback) {
	async.series([    
	    db.createTable.bind(db, 'phototype', {
		    columns: {
		      id: { type: 'int', primaryKey: true, autoIncrement: true },      
		      size: { type: 'string', length: 45}
		    },
		    ifNotExists: true
	  	}),
	  	db.insert.bind(db, 'phototype', ['size'], ['Original']),
	  	db.insert.bind(db, 'phototype', ['size'], ['Thumnail_160X160'])
	  	], callback);
};

exports.down = function (db, callback) {
  db.dropTable('phototype', callback);
};