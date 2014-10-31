var baseModel = require('./base');
var Drug;

Drug = baseModel.Model.extend({
  tableName: 'drug'
});

module.exports = baseModel.model('Drug', Drug);