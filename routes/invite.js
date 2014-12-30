// API Server Endpoints
var controllers = require("../controllers");
module.exports = exports = [
    {
        method: 'post',
        path: '/invite',
        config: controllers.inviteController.invite
    }
];