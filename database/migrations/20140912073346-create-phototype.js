'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('phototype', function (table) {
            table.increments('id').primary();
            table.string('size', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([{size:'Original'},{size:'Thumnail_160X160'}]).into('phototype');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('phototype');
}
