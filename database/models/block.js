/**
 * @description This model is a used to prevent users from stalking other users.
 */

var baseModel = require('./base');
var Block;

Block = baseModel.Model.extend({
  tableName: 'block'
});

module.exports = baseModel.model('Block', Block);
