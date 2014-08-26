var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function (db, callback) {
  db.createTable('users', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      username: { type: 'string', length: 30, unique: true },
      email: { type: 'string', length: 60},
      group_id: { type: 'smallint', length: 1},
      social_login_type: { type: 'smallint', length: 1}, //facebook=1, instagram=2, twitter=3, google=4
      social_login_token: { type: 'string', length: 60},
      status: { type: 'smallint', length: 1}, //pending=1,active=2,deleted=2,
      created: { type: 'datetime'}, 
      modified: { type: 'datetime'}
    },
    ifNotExists: true
  }, callback);
}

exports.down = function (db, callback) {
  db.dropTable('users', callback);  
};