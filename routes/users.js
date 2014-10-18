// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'post',
        path: '/user/signup',
        config: controllers.userController.signUp
    },
    {
        method: 'put',
        path: '/user/{id}',
        config: controllers.userController.update
    },
];