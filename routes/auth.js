// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'post',
        path: '/auth/login',
        config: controllers.authController.login
    },
    {
        method: 'get',
        path: '/auth/logout',
        config: controllers.authController.logout
    },
    {
        method: ['GET', 'POST'], // Must handle both GET and POST
        path: '/auth/facebook/login',
        config: controllers.authController.facebook
    }
    
];