	var	Promise = require('bluebird');
	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../../");
		
	function extractCookie(data){
		var tmp = data.match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);
		if(tmp.length == 2){
			return tmp[0];
		}
		return null;
	}
	function getServerResponseAsPromise(payload){
		return new Promise(function(resolve, reject) {
			server.inject(payload, function(response) {
				return resolve(response); // we get the data here, so resolve the Promise
			});
		});
	}
	function loginAsPromise(payload) {
		return getServerResponseAsPromise(payload).then(function(response){
			Code.expect(response.statusCode).to.equal(200);
			Code.expect("set-cookie" in response.headers).to.equal(true);
			return extractCookie(response.headers['set-cookie'][0]);
		});
	}
	function login(payload, callback) {
		server.inject(payload, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			Code.expect("set-cookie" in response.headers).to.equal(true);
			callback(null,extractCookie(response.headers['set-cookie'][0]));
		});
	}
	function logoutAsPromise(cookie){
		//logout
		var payload = {
			method: "get",
			url: "/auth/logout",
			headers : {cookie:cookie}
		};
		return getServerResponseAsPromise(payload).then(function(response){
			return Code.expect(response.statusCode).to.equal(200);
		});
	}
	function logout(cookie, callback) {
		//logout
		var payload = {
			method: "get",
			url: "/auth/logout",
			headers : {cookie:cookie}
		};		
		server.inject(payload, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			callback();
		});
	}

module.exports = {
	login : login,
	logout : logout,
	extractCookie : extractCookie,
	getServerResponseAsPromise : getServerResponseAsPromise,
	loginAsPromise : loginAsPromise,
	logoutAsPromise : logoutAsPromise,
}