'use strict';
exports.up = function(knex, Promise) {
	return knex.schema.table('user', function (table) {
        table.dropColumn('salt');
    });
};

exports.down = function(knex, Promise) {
	return knex.schema.table('user', function (table) {
        table.string('salt', 60).nullable();
    });
};