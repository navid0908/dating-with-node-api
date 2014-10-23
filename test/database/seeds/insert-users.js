'use strict';
	
var users = [{
	password: '$2a$10$ZwoBxFZsBOBXGMfKvZYQ3OnQgXAIiqi5UlJWRhQZr1NP.BPQMnyYC', //testpassword
	email:'testemail@test.com',
	group_id:10,
	status: 'active',
	updated_at: new Date(),
	created_at: new Date(),
}]

exports.seed = function(knex, Promise) {
  var userPromises = [];

  users.forEach(function(user){
    userPromises.push(createUser(knex, user));
  });

  return Promise.all(userPromises);
};

function createUser(knex, userData) {
  return knex.table('user')
    .returning('id')
    .insert(userData)
    .then(function(userIds){});
}