/**
 * @description This model is a lookup table for the various Education Levels.
 */

var datingWithNode = require('./base');
var Education;

Education = datingWithNode.Model.extend({
  tableName: 'education'
});

module.exports = datingWithNode.model('Education', Education);