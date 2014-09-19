// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'post',
        path: '/user',
        config: controllers.userController.createUser
    }
];