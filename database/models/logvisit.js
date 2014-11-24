/**
 * @description This model identifies each person a user visits.
 */

var baseModel = require('./base');
var Logvisit;

Logvisit = baseModel.Model.extend({
  tableName: 'logvisit'
});

module.exports = baseModel.model('Logvisit', Logvisit);
