var datingWithNode = require('./base');
var Country;

Country = datingWithNode.Model.extend({
  tableName: 'country'
});

module.exports = datingWithNode.model('Country', Country);
