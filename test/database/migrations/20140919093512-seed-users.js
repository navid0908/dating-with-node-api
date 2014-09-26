var async = require('async');

exports.up = function (db, callback) {
    async.series([
        db.runSql.bind(db,
        	'INSERT INTO user (`username`, `email`, `password`, `salt`, `group_id`, `status`, `created`, `modified`) VALUES ("testjohndoe","testemail@test.com","testpassword","somesaltkey",10,"active",NOW(),NOW())', []),
    ], callback);
};

exports.down = function (db, callback) {
    async.series([
        db.runSql.bind(db,'DELETE FROM user where email = "testemail@test.com"', []),
    ], callback);
};