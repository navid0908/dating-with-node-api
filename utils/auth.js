	var Lab = require("lab");
	var Code = require('code');   // assertion library
	var server = require("../");
		
	function login(payload, callback) {
		server.inject(payload, function(response) {
			Code.expect(response.statusCode).to.equal(200);
			Code.expect("set-cookie" in response.headers).to.equal(true);
			var tmp = response.headers['set-cookie'][0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/);			
			callback(null,tmp[0]);
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
	login: login,
	logout: logout
}