/**
 * @description This model is a lookup table for the various Children a user identifies with.
 */

var baseModel = require('./base');
var Children;

Children = baseModel.Model.extend({
  tableName: 'children'
});

module.exports = baseModel.model('Children', Children);
