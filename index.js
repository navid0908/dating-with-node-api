/**
 * Dependencies.
 */
var Hapi        = require('hapi');
var config      = require('./config/config');
var routes      = require('./routes');

var server = new Hapi.Server(Number(config.hapi.port));
server.pack.register(config.hapi.plugins, function(err) {
	    if (err) throw err;

	    // Configure the plugins that are now attached to the server.
	    for (var index=0; index < config.hapi.auth.strategy.length; index++){
			server.auth.strategy(
				config.hapi.auth.strategy[index].name,
				config.hapi.auth.strategy[index].scheme,
				config.hapi.auth.strategy[index].options
			);
	    }

	    // Configure database connection
		var dbHandler = require('./database');
		dbHandler.init(config.database);

	    // Add configured routes to the server routes
		for (var tmp in routes){
		    server.route(routes[tmp]);
		};
});

// If the script is being required as a module by another script, don’t start the server.
if (!module.parent)
{
	server.start(function() {
        console.log("Hapi server started @ " + server.info.uri);
    });
}

// Make the server available as the top-level export of this module.
module.exports = server;