	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
	var models = require('../../database');
	var async = require('async');
	var util = require('../utils/auth');
	var date = require('../utils/date');
	var	Promise = require('bluebird');
	var _ = require("lodash");

	// Test shortcuts
	var lab = exports.lab = Lab.script();

/*
	***
		@description: The purpose here is to test profile update failures due to invalid parameters
	***
*/
	lab.experiment("method:put, url:/profile/{id} - Profile update fails due to invalid/missing parameters ", function() {
		var cookie;
		var user = {
						email: 'test-profile-controller@test.com',
						username: 'test-profile-controller',
						password: 'testpassword',
						network: 'email'
		};
		var profile = {
					gender: 'm',
					orientation: 's',
		};
		var userRecord;
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (result) {
				userRecord = result.toJSON();
				return userRecord;
			}).then(function (result) {
				profile.user_id = result.id;
				return models.Profile.add(profile);
			}).then(function (result) {
				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: user.network,
						email: user.email,
						password: user.password,
					}
				};
			}).then(function(payloadRequest){
				//perform login action and store the cookie.
				util.login(payloadRequest, function(err, result) {
					cookie = result;
					done();
				});
			});
		});
		lab.afterEach(function (done) {
			//logout
			util.logout(cookie, function(err, result) {});
			models.Profile.findOne({user_id:userRecord.id}).
			then(function (profileRecord) {
				return profileRecord.destroy({id:profileRecord.get('id')});
			}).then(function(result) {
				return models.User.destroy({id:userRecord.id})
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid orientation", function(done) {
			var orientations = ['X','x','m','f','M','F','S','G','B','L'];
			var promises = [];
			var payloadRequest;
			orientations.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						orientation:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid gender", function(done) {
			var genders = ['X','x','M','F','S','G','B','L'];
			var promises = [];
			var payloadRequest;
			genders.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						gender:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid birthday", function(done) {
			var dobs = [
				Date.parse('01-01-1939'),
				Date.parse('01/01/2001'),
				Date.parse('01/01/2002'),
				Date.parse('01/01/2003'),
				Date.parse('01/01/2004'),
			];
			var payloadRequest;
			var promises = [];
			dobs.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						birthday:entry.valueOf(),
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid bodytype", function(done) {
			var ranges = [-11,-5,0,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						bodytype:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid diet", function(done) {
			var ranges = [-11,-5,0,7,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						diet:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid smoke", function(done) {
			var ranges = [-11,-5,0,6,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						smoke:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid diet and valid smoke", function(done) {
			var payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						diet:7,
						smoke:4
					},
					headers : {cookie:cookie}
				};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("with invalid smoke and valid diet", function(done) {
			var payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						smoke:6,
						diet:5
					},
					headers : {cookie:cookie}
				};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(400);
				done();
			});
		});
		lab.test("with invalid drug", function(done) {
			var ranges = [-11,-5,0,4,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						drug:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid drink", function(done) {
			var ranges = [-11,-5,0,6,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						drink:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid education", function(done) {
			var ranges = [-11,-5,0,8,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						education:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid children", function(done) {
			var ranges = [-11,-5,0,4,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						children:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid activelevel", function(done) {
			var ranges = [-11,-5,0,6,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						activelevel:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid astrologicalsign", function(done) {
			var ranges = [-11,-5,0,13,21];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						astrologicalsign:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid profession", function(done) {
			var ranges = [-11,-5,0,21,31];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						profession:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid relationshipstatus", function(done) {
			var ranges = [-11,-5,0,7,11];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						relationshipstatus:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});
		lab.test("with invalid height", function(done) {
			var ranges = [80,89,90,215,220];
			var payloadRequest;
			var promises = [];
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id,
					payload: {
						height:entry,
					},
					headers : {cookie:cookie}
				};
				promises.push(util.getServerResponseAsPromise(payloadRequest));
			});
			Promise.map(promises, function(response) {
				Code.expect(response.statusCode).to.equal(400);
			}).then(function() {
				done();
			});
		});		
		lab.test("with invalid questionid", function(done) {
			var ranges = [-11,-5,0,11,22];
			var payloadRequest;
			ranges.forEach(function(entry){
				payloadRequest = {
					method: "put",
					url: "/profile/" + userRecord.id + "/answer",
					payload: {
						id:entry,
						answer:'this is a test answer for a random question that does not exist'
					},
					headers : {cookie:cookie}
				};
				server.inject(payloadRequest, function(response) {
					Code.expect(response.statusCode).to.equal(400);
				});
			});
			done();
		});
	});
/*
	***
		@description: The purpose here is to test successful profile update
	***
*/
	lab.experiment("method:put, url:/profile/{id} - Profile update succeeds ", function() {
		var cookie;
		var user;
		lab.beforeEach(function (done) {
			user = {
					email: 'test-profile-controller-put@test.com',
					username: 'test-lookup-controller-put',
					password: 'testpassword',
					network: 'email'
			};
			models.User.add(user).then(function (result) {
				user.id = result.get('id');
				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: user.network,
						email: user.email,
						password: user.password
					}
				};
			}).then(function(payload){
				return util.loginAsPromise(payload);
			}).then(function(response){
				cookie = response;
				done();
			});
		});
		lab.afterEach(function (done) {
			var profile = null;
			var payload = {
				method: "get",
				url: "/auth/logout",
				headers : {cookie:cookie}
			};
			//logout
			util.logoutAsPromise(cookie).then(function(){
				return models.Profile.findOne({user_id:user.id});
			}).then(function (profileRecord) {
				profile = profileRecord;
				return (profileRecord) ? models.Profileanswer.findOne({profile_id: profileRecord.get('id')}) : false;
			}).then(function (profileAnswer) {
				return (profileAnswer) ? models.Profileanswer.destroy({id:profileAnswer.get('id')}) : profile;
			}).then(function () {
				return (profile) ? models.Profile.destroy({id:profile.get('id')}) : true;
			}).then(function() {
				return models.User.destroy({id:user.id});
			}).then(function() {
				done();
			});
		});
		lab.test("with valid orientation", function(done) {
			var promises = [];
			var response = null;
			var ranges = ['g', 's', 'b'];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						orientation:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('orientation'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid gender", function(done) {
			var promises = [];
			var response = null;
			var ranges = ['m', 'f'];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						gender:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('gender'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid birthday", function(done) {
			var promises = [];
			var response = null;
			var ranges = [
				Date.parse('01-01-1940'),
				Date.parse('01-02-1940'),
				Date.parse('01-02-1950'),
				Date.parse('01-02-1980'),
				Date.parse('01-02-1990'),
				Date.parse('12/29/1999'),
			];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						birthday:entry.valueOf(),
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(Date.parse(result.get('birthday')));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});

		lab.test("with valid bodytype", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4,5];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						bodytype:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('bodytype_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid diet", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4,5];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						diet:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('diet_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid smoke", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						smoke:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('smoke_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid drug", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						drug:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('drug_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid drink", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						drink:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('drink_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid education", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						education:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('education_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid children", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						children:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('children_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid activelevel", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4,5];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						activelevel:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('activelevel_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid astrologicalsign", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4,5];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						astrologicalsign:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('astrologicalsign_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid profession", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						profession:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('profession_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid relationshipstatus", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1,2,3];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						relationshipstatus:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('relationshipstatus_id'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid height", function(done) {
			var promises = [];
			var response = null;
			var ranges = [152.5,180.22];
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id,
					payload: {
						height:entry,
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profile.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('height'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
		lab.test("with valid questionid", function(done) {
			var promises = [];
			var response = null;
			var ranges = [1]
			var payloadRequest;

			Promise.reduce(ranges, function(done, entry) {
				payloadRequest = {
					method: "put",
					url: "/profile/" + user.id + "/answer",
					payload: {
						id: entry,
						answer:"My Self Summary: What I can say is that I am blah and blah is blah."
					},
					headers : {cookie:cookie}
				};
				return util.getServerResponseAsPromise(payloadRequest).then(function(response) {
					return models.Profileanswer.findOne({user_id:user.id}).then(function(result){
						Code.expect(entry).to.equal(result.get('question_id'));
						Code.expect(payloadRequest.payload.answer).to.equal(result.get('answer'));
						Code.expect(response.statusCode).to.equal(200);
					});
				});
			}, 0).then(function() {
			    done();
			});
		});
	});
// /*
// 	***
// 		@description: The purpose here is to test profile get
// 	***
// */
	lab.experiment("method:get, url:/profile - ", function() {
		var cookie;
		var user = {
						email: 'test-profile-controller-get@test.com',
						username: 'test-profile-controller-get',
						password: 'testpassword',
						network: 'email'
		};
		var profile = {
					gender: 'm',
					orientation: 's',
		};
		var userRecord;
		lab.beforeEach(function (done) {
			//setup test record
			models.User.add(user).then(function (result) {
				userRecord = result.toJSON();
				return userRecord;
			}).then(function (result) {
				profile.user_id = result.id;
				return models.Profile.add(profile);
			}).then(function (result) {
				//setup payload
				return {
					method: "post",url: "/auth/login",
					payload: {
						network: user.network,
						email: user.email,
						password: user.password,
					}
				};
			}).then(function(payloadRequest){
				//perform login action and store the cookie.
				util.login(payloadRequest, function(err, result) {
					cookie = result;
					done();
				});
			});
		});
		lab.afterEach(function (done) {
			//logout
			util.logout(cookie, function(err, result) {});
			models.Profile.findOne({user_id:userRecord.id}).
			then(function (profileRecord) {
				return profileRecord.destroy({id:profileRecord.get('id')});
			}).then(function(result) {
				return models.User.destroy({id:userRecord.id})
			}).then(function() {
				done();
			});
		});
		lab.test("Profile get fails for invalid profile id", function(done) {
			var payloadRequest = {
				method: "get",
				url: "/profile?id="+123456789,
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(404);
				done();
			});
		});
		lab.test("Profile get succeeds for valid profile id", function(done) {
			var payloadRequest = {
				method: "get",
				url: "/profile?id="+userRecord.id,
				headers : {cookie:cookie}
			};
			server.inject(payloadRequest, function(response) {
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(response.result.hasOwnProperty('profile')).to.be.a.boolean();
				done();
			});
		});
	});