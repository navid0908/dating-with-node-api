var async = require('async');

exports.up = function (db, callback) {
    async.series([
        db.runSql.bind(db,'ALTER TABLE photo ADD CONSTRAINT fk_photo_user_id FOREIGN KEY (user_id) REFERENCES user(id)', []),
        db.runSql.bind(db,'ALTER TABLE photo ADD CONSTRAINT fk_photo_phototype_id FOREIGN KEY (phototype_id) REFERENCES phototype(id)', [])
    ], callback);
};

exports.down = function (db, callback) {
    async.series([
        db.runSql.bind(db,'ALTER TABLE photo DROP FOREIGN KEY fk_photo_user_id', []),
        db.runSql.bind(db,'ALTER TABLE photo DROP FOREIGN KEY fk_photo_phototype_id', [])
    ], callback);
};