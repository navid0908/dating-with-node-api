var baseModel = require('./base');
var Block;

Block = baseModel.Model.extend({
  tableName: 'block'
});

module.exports = baseModel.model('Block', Block);
