/**
 * Dependencies.
 */
var Hapi        = require('hapi'),
    config      = require('./config/config'),
    routes      = require('./routes'),
    routeEntry;

var server = new Hapi.Server(config.port);

// makes sure that if the script is being required as a module by another script, we don’t start the server. 
if (!module.parent)
{
    server.start(function(){
        console.log("Server started", server.info.uri);
    });
}

// Add configured routes to the server routes
for (routeEntry in routes){
    server.route(routes[routeEntry]());
};

module.exports = server;