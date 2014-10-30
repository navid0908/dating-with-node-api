var datingWithNode = require('./base');
var Diet;

Diet = datingWithNode.Model.extend({
  tableName: 'diet'
});

module.exports = datingWithNode.model('Diet', Diet);
