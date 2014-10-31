
var baseModel = require('bookshelf').dbh;

// Load the registry plugin, which helps us avoid circular dependencies
baseModel.plugin('registry');

baseModel.Model = baseModel.Model.extend({},{});

// Export baseModel for use elsewhere
module.exports = baseModel;