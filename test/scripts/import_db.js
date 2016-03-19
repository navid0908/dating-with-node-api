var	config = require('../../config/knexfile');

// connect without database selected
var knex = require('knex')(config.development);

knex.raw('DROP DATABASE IF EXISTS `' + config.development.connection.database + '`')
.then(function(){
	knex.raw('CREATE DATABASE `' + config.development.connection.database + '`')
})
.then(function(){
	knex.destroy();
});

