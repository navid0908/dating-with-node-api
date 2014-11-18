var baseModel = require('./base');
var Astrologicalsign;

Astrologicalsign = baseModel.Model.extend({
  tableName: 'astrologicalsign'
});

module.exports = baseModel.model('Astrologicalsign', Astrologicalsign);