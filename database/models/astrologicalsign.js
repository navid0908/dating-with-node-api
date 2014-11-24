/**
 * @description This model is a lookup table for the various Astrological Signs
 */

var baseModel = require('./base');
var Astrologicalsign;

Astrologicalsign = baseModel.Model.extend({
  tableName: 'astrologicalsign',
  hasTimestamps: false,
});

module.exports = baseModel.model('Astrologicalsign', Astrologicalsign);