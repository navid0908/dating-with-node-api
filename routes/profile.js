// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
	{
		method: 'get',
		path: '/profile',
		config: controllers.profileController.get
	},
	{
		method: 'put',
		path: '/profile/{id}',
		config: controllers.profileController.update
	},
];