var datingWithNode = require('./base');
var Activelevel;

Activelevel = datingWithNode.Model.extend({
  tableName: 'activelevel'
});

module.exports = datingWithNode.model('Activelevel', Activelevel);
