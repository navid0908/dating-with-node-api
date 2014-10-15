'use strict';
exports.up = function(knex, Promise) {
	return knex.schema.table('user', function (table) {
        table.renameColumn('social_login_token', 'social_login_id');
    });
};

exports.down = function(knex, Promise) {
	return knex.schema.table('user', function (table) {
        table.renameColumn('social_login_id', 'social_login_token');
    });
};