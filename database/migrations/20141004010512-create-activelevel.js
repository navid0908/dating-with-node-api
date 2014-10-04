'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('activelevel', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Never Active'},
                    {description:'Rarely Active'},
                    {description:'Selected Activities'},
                    {description:'Active'},
                    {description:'Very Active'}                    
        		]).into('activelevel');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('activelevel');
}