var config     = require('../../config/config');
var knex 	= require('knex')(config.database);
var datingWithNode;

datingWithNode = require('bookshelf')(knex);

// Load the registry plugin, which helps us avoid circular dependencies
datingWithNode.plugin('registry');

datingWithNode.Model = datingWithNode.Model.extend({},{});

// Export datingWithNode for use elsewhere
module.exports = datingWithNode;