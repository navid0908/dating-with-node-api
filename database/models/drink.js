var datingWithNode = require('./base');
var Drink;

Drink = datingWithNode.Model.extend({
  tableName: 'drink'
});

module.exports = datingWithNode.model('Drink', Drink);