var baseModel = require('./base');
var Buzzline;

Buzzline = baseModel.Model.extend({
  tableName: 'buzzline'
});

module.exports = baseModel.model('Buzzline', Buzzline);
