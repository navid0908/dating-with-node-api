var datingWithNode = require('./base');
var Smoke;

Smoke = datingWithNode.Model.extend({
  tableName: 'smoke'
});

module.exports = datingWithNode.model('Smoke', Smoke);