var async = require('async');
var bcrypt = require('bcrypt');
var _ = require('underscore');

var baseModel = require('./base');
var Photo = require('./photo');
var User;

// private internal properties/functions
var internals = {};

User = baseModel.Model.extend({
    tableName: 'user',
    hasTimestamps: ['created_at', 'updated_at'],
    defaults: function() {
       return {
         // default values for when the record is created.
         status: 'ative',
         group_id : User.userStandard()
       }
    },
    photos : function(){
        return this.hasMany(Photo);
    }},{
    getAttributues : function(){
        return ['id','username','email','password','group_id','social_login_type','social_login_id','status','created_at','updated_at'];
    },
    userStandard : function(){
        return 10;
    },
    isUsernameTaken : function(userName, callback){
        if (!userName){
            return callback('userName is undefined');
        }
        this.query({where: {username: userName}}).fetchAll().then(function(collection){
            if (collection.length >= 1){
                return callback('username is taken', true);
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
                return callback('email is taken',true);
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
    find : function(payload, callback){
        var self = this;
        var defaults = this.getAttributues();

        async.auto({
            isValidPayload : function(done){
                _.each(payload, function(value, key){
                     if(self.getAttributues().indexOf(key) == -1){
                        //@TODO: log error
                        return done('Unable to search by the given key: ' + key);
                     }
                });
                done();
            }
        }, function(err, results){
            if (err) {
                //@TODO: log db error.
                return callback(err);
            }
            self.query({where: payload}).fetchAll().then(function(collection){
                if (collection.length == 0){
                    callback(null, null);
                }else if (collection.length == 1){
                    callback(null,  collection.at(0));
                }else{
                    callback(null,collection);
                }
            });
        });
    },
    findBySocialCredentials : function(socialLoginType, socialLoginId, callback){
        var self = this;
        async.auto({
                user: function (done) {
                    self.query({where: {
                        social_login_type: socialLoginType,
                        social_login_id: socialLoginId
                    }}).fetch().then(function(model){
                        done(null,model);
                    });
                }
            }, function (err, results) {
                if (err) {
                    //@TODO: log db error.
                    return callback(err);
                }
                if(results.user){
                    // found record
                    return callback(null, results.user);
                }
                callback();
        });
    },
    findByCredentials : function(emailAddress, password, callback){
        var self = this;
        async.auto({
                // user: function (done) {
                //     self.query({where: {email: emailAddress}}).fetch().then(function(model){
                //         done(null,model);
                //     });
                // },
                user: function (done) {
                    self.find({email: emailAddress}, done);
                },
                passwordMatch: ['user', function (done, results) {
                    //unable to locate the user based on the email.
                    if (!results.user) {
                        return done(null, false);
                    }
                    //found a user record, lets compare the passwords.
                    bcrypt.compare(password, results.user.get('password'), done);
                }]
            }, function (err, results) {
                if (err) {
                    //@TODO: log db error.
                    return callback(err);
                }
                if(results.passwordMatch){
                    // credentials are valid.
                    // return the user object to the requester but replace the hash password with the original.
                    results.user.set('password', password);
                    return callback(null, results.user);
                }
                callback();
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

module.exports = baseModel.model('User', User);