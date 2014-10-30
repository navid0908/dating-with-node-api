var datingWithNode = require('./base');
var Children;

Children = datingWithNode.Model.extend({
  tableName: 'children'
});

module.exports = datingWithNode.model('Children', Children);
