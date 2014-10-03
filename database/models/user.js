module.exports = function(bookshelf){
    var User = bookshelf.Model.extend({
        tableName: 'user',
        isUsernameTaken : function(userName, callback){            
            if (!userName){
                return callback('Value is undefined');
            }
            this.query({where: {username: userName}}).fetchAll().then(function(collection){                
                if (collection.length >= 1){
                    return callback(null, true);
                }else{
                    return callback(null, false);
                }
            });
        },
        isEmailTaken : function(emailAddress, callback){
            if (!emailAddress){                
                return callback('Value is undefined');
            }
            this.query({where: {email: emailAddress}}).fetchAll().then(function(collection){                
                if (collection.length >= 1){
                    return callback(null, true);
                }else{
                    return callback(null, false);
                }
            });
        },
        create : function(data, callback){
            new this.constructor(data).save().then(function(model) {
              return callback(null, model);
            });
        },
    });
    return new User();
};