/**
 * Dependencies.
 */
var Hapi        = require('hapi');
var config      = require('./config/config');
var routes      = require('./routes');

var server = new Hapi.Server(Number(config.hapi.port));
	server.pack.register([
		{plugin:require('lout')}, // Self documenting tool for routes with http method.
		{plugin:require('bell')}, // Social login plugin
		{plugin:require('hapi-auth-cookie')} // Session management plugin
		], function(err) {
		    if (err) throw err;

		    // Configure the plugins that are now attached to the server.
		    for (var index=0; index < config.plugin.auth.strategy.length; index++){
				server.auth.strategy(
					config.plugin.auth.strategy[index].name,
					config.plugin.auth.strategy[index].scheme,
					config.plugin.auth.strategy[index].options
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