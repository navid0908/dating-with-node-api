'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('drink', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Very often'},
                    {description:'Often'},
                    {description:'Socially'},
                    {description:'Rarely'},
                    {description:'Not at all'},
        		]).into('drink');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drink');
}
