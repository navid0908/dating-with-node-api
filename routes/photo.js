// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
	{
		method: 'get',
		path: '/photo/{username}',
		config: controllers.photoController.get
	},
	{
		method: 'post',
		path: '/photo',
		config: controllers.photoController.add
	},
	{
		method: 'put',
		path: '/photo/{id}',
		config: controllers.photoController.update
	},
];