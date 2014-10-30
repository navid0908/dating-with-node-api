var datingWithNode = require('./base');
var Bodytype;

Bodytype = datingWithNode.Model.extend({
  tableName: 'bodytype'
});

module.exports = datingWithNode.model('Bodytype', Bodytype);
