'use strict';
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bodytype', function (table) {
            table.increments('id').primary();
            table.string('description', 45).notNullable().unique();
        }).then(function(table){
        	return knex.insert([
                    {description:'Rather not say'},
                    {description:'Thin'},
                    {description:'Overweight'},
                    {description:'Skinny'},
                    {description:'Average'},
                    {description:'Fit'},
                    {description:'Athletic'},
                    {description:'A little extra'},
                    {description:'Curvy'},
                    {description:'Full figured'},
        		]).into('bodytype');
		});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bodytype');
}
