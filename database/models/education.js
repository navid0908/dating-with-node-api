var datingWithNode = require('./base');
var Education;

Education = datingWithNode.Model.extend({
  tableName: 'education'
});

module.exports = datingWithNode.model('Education', Education);