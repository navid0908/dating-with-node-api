'use strict';

/**
 * Dependencies.
 */
const Hapi        = require('hapi');
const config      = require('./config/config');
const routes      = require('./routes');

const server = new Hapi.Server({
	cache: config.hapi.options.cache.engine,
	load: {
		sampleInterval: 1000
	}
});

server.connection({
	host:config.hapi.host,
	port: Number(config.hapi.port)
});

server.register([
		require('vision'),
		require('inert'),
		{ register: require('bell') },
		{ register: require('lout') },
		{ register: require('hapi-auth-cookie') },
		{ register: require('./plugins/mailer/'), options: {
				apiKey: "Pxxxa7WR1Avq52_xxxxZxxxxx",
				apiHost: "https://mandrillapp.com/api/1.0/"
		}}
	], function(err) {}
);

for (var index=0; index < config.hapi.auth.strategy.length; index++){
	server.auth.strategy(
		config.hapi.auth.strategy[index].name,
		config.hapi.auth.strategy[index].scheme,		
		config.hapi.auth.strategy[index].options
	);
}

const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
server.app.cache = cache;

server.auth.strategy('session', 'cookie', true, {
    password: 'password-should-be-32-characters',
    cookie: 'dating-with-node',
    redirectTo: "/auth/login",
    isSecure: false,
    validateFunc: function (request, session, callback) {
        cache.get(String(session.id), (err, cached) => {
            if (err) {
                return callback(err, false);
            }
            if (!cached) {
                return callback(null, false);
            }
            return callback(null, true, cached.user);
        });
    }
});

// Add configured routes to the server routes
for (var tmp in routes){
	server.route(routes[tmp]);
};

// Configure database connection
var dbHandler = require('./database');
dbHandler.init(config.database);


server.start((err) => {
	if(err){
		console.log(err);
	}
	console.log("Hapi server started @ " + server.info.uri);
});

// Make the server available as the top-level export of this module.
module.exports = server;
