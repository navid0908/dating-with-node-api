// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
	{
		method: 'get',
		path: '/photo',
		config: controllers.photoController.get
	},
	{
		method: 'put',
		path: '/photo/{id}',
		config: controllers.photoController.update
	},
];