'use strict';

var _ = require('lodash');
var schema = require("../schema/dating-with-node");
var fixtures = require("../fixtures/dating-with-node");
var utils = require("../utils");
var sequence = require('../../utils/sequence');

function loadTables(tableNames,knex){
 	return _.map(tableNames, function (tableName) {
		return function(){
			return utils.createTable(tableName, knex);	
		}
	});	
}

function populateTables(tableNames, knex){
	return _.map(tableNames, function (tableName) {
		if (fixtures.hasOwnProperty(tableName)){			
			return utils.populateTable(tableName, knex, fixtures[tableName]);
		}
	});
}

function dropTables(tableNames,knex){
 	// Delete all tables in reverse order
 	return _.map(tableNames, function (tableName) {
		return utils.deleteTable(tableName, knex);
	}).reverse();
}

exports.up = function(knex, Promise) {
	var tables = [];
	var tableSequence;
	var tableNames = _.keys(schema);

	tables = loadTables(tableNames,knex);
	tableSequence = sequence(tables);	

	return tableSequence.then(function () {
		console.log('DB setup successful.');
		return Promise.all(populateTables(tableNames,knex));
    });
};

exports.down = function(knex, Promise) {
	var tableNames = _.keys(schema);

	Promise.all(dropTables(tableNames,knex)).done(function(results){
		console.log('DB cleanup successful');
	},function(err){
		console.log('DB cleanup failed: ' + err);
  	});
};
