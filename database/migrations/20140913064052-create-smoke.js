'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('smoke', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Yes'},
                    {description:'Sometimes'},
                    {description:'When drinking'},
                    {description:'Trying to quit'},
                    {description:'No'}
        		]).into('smoke');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('smoke');
}
