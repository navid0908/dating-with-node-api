// # Post Model
var datingWithNode = require('./base');
var Authattempt;

Authattempt = datingWithNode.Model.extend({
  tableName: 'authattempt',
  defaults: function() {
     return {
       // default values for when the record is created.
       created_at : new Date()
     }
  }},{
  createEntry : function(emailAddress, ipAddress, callback){
    var data = {
        email:emailAddress,
        ip:ipAddress,
      };
      new Authattempt(data).save().then(function(model) {
            callback(null,model);
          }, function(error){
                //save failed
                //@TODO: log db error.
                callback(error);
          });
  },
  findByEmailIpaddress : function(emailAddress, ipAddress, callback){
    if (!emailAddress){
      return callback('email is undefined');
    }
    if (!ipAddress){
        return callback('ip address is undefined');
    }
    this.query({where: {email: emailAddress, ip: ipAddress}}).fetchAll().then(function(collection){
        return callback(null, collection);
    });
  },
});

module.exports = datingWithNode.model('Authattempt', Authattempt);
