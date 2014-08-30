/**
 * Dependencies.
 */
var Hapi        = require('hapi'),
	lout		= require('lout'),
    config      = require('./config/config'),
    routes      = require('./routes'),
    routeEntry;

var server = new Hapi.Server(Number(config.port));

// makes sure that if the script is being required as a module by another script, we don’t start the server. 
if (!module.parent)
{
	server.pack.register({plugin: lout}, function(err) {
	    if (err) throw err;
	    server.start(function() {
	        console.log("Hapi server started @ " + server.info.uri);
	    });
	});
}


// Add configured routes to the server routes
for (routeEntry in routes){
    server.route(routes[routeEntry]());
};

// Make the server available as the top-level export of this module.
module.exports = server;