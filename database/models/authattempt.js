/**
 * @description - The purpose of this model is to log each invalid login attempt.
 */

var baseModel = require('./base');
var Promise = require('bluebird');
var Authattempt;

  Authattempt = baseModel.Model.extend({
    tableName: 'authattempt',
    hasTimestamps: false,
    defaults: function() {
      return {
        // default values for when the record is created.
        created_at : new Date()
      }
    },
  },{
    /**
    * ### add - Adds a failed log in attempt.
    *
    * @param {object} data
    * @param {object} options
    * @extends baseModel.Model.add
    */
    add: function (data, options) {
      if(!data.email){
        return Promise.reject('email is undefined');
      }
      if(!data.ip){
        return Promise.reject('ip address is undefined');
      }

      return baseModel.Model.add.call(this, data, options);
    },
    /**
    * ### findAll - Find all log in attempts.
    *
    * @param {object} data
    * @param {object} options
    * @extends baseModel.Model.findAll
    */
    findAll: function (data) {
      if(!data.email){
        return Promise.reject('email is undefined');
      }
      if(!data.ip){
        return Promise.reject('ip address is undefined');
      }

      return baseModel.Model.findAll.call(this, {email:data.email, ip: data.ip});
    },
  });

module.exports = baseModel.model('Authattempt', Authattempt);