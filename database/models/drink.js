var baseModel = require('./base');
var Drink;

Drink = baseModel.Model.extend({
  tableName: 'drink'
});

module.exports = baseModel.model('Drink', Drink);