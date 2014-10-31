var baseModel = require('./base');
var Children;

Children = baseModel.Model.extend({
  tableName: 'children'
});

module.exports = baseModel.model('Children', Children);
