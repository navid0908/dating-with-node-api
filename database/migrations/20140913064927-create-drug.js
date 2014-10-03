'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('drug', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Never'},
                    {description:'Sometimes'},
                    {description:'Often'},
        		]).into('drug');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drug');
}
