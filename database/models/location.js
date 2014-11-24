/**
 * @description This model stores information about a user's geograhpic location.
 */

var baseModel = require('./base');
var Locaiton;

Locaiton = baseModel.Model.extend({
  tableName: 'location'
});

module.exports = baseModel.model('Locaiton', Locaiton);
