var datingWithNode = require('./base');
var Drug;

Drug = datingWithNode.Model.extend({
  tableName: 'drug'
});

module.exports = datingWithNode.model('Drug', Drug);