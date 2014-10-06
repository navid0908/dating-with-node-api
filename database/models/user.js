var async = require('async');
var bcrypt = require('bcrypt');

module.exports = function(bookshelf){
    var User = bookshelf.Model.extend({
        tableName: 'user',
        hasTimestamps: ['created_at', 'updated_at'],
        defaults: function() {
           return {
             // defaults values when the record is created.
             status: 'ative',
             group_id : this.getUserBasicGroupId()
           }
        },
        getUserBasicGroupId : function(){
            return 10;
        },
        isUsernameTaken : function(userName, callback){            
            if (!userName){
                return callback('userName is undefined');
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
                return callback('email is undefined');
            }
            this.query({where: {email: emailAddress}}).fetchAll().then(function(collection){                
                if (collection.length >= 1){
                    return callback(null, true);
                }else{
                    return callback(null, false);
                }
            });
        },
        generatePasswordHash : function (password, callback){
            async.auto({
                    salt: function (done) {
                        bcrypt.genSalt(10, done);
                    },
                    hash: ['salt', function (done, results) {
                        bcrypt.hash(password, results.salt, done);
                    }]
                }, function (err, results) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, {
                        password: password,
                        hash: results.hash
                    });
            });
        },
        createAccount : function(username, email, password, callback){
            var self = this;
            async.auto({
                passwordHash: this.generatePasswordHash.bind(this, password),
                newUser: ['passwordHash', function (done, results) {
                    var data = {
                        username: username,
                        password: results.passwordHash.hash,
                        email: email,
                        social_login_type: 'email'
                    };
                    new User(data).save().then(function(model) {
                        done(null,model);
                    }, function(error){
                        //save failed
                        //@TODO: log db error.
                        done(error);
                    });
                }]
            }, function (err, results) {
                if (err) {
                    //@TODO: log error in creating account
                    return callback(err);
                }
                if (results){
                    // return the user object to the requester but replace the hash password with the original.
                    results.newUser.set('password', results.passwordHash.password)
                    callback(null, results.newUser);
                }
            });
        },
    });
    return new User();
};