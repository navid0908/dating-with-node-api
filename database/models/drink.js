/**
 * @description This model is a lookup table for the various Drinking activities for a user
 */

var baseModel = require('./base');
var Drink;

Drink = baseModel.Model.extend({
  tableName: 'drink'
});

module.exports = baseModel.model('Drink', Drink);