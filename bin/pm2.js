var path = require('path'),
	exec = require('child_process').exec,
	basepath = path.dirname(__dirname),	
	
	//main entry point into the app.
	//@TODO: make this into a config option
	apiEntryPoint = path.resolve(basepath, 'index.js');

var	list = function(cb) {
	processes = exec('pm2 list ', {}, function(err, stdout, stderr) {
		
		if(err !== undefined && err !== null) {
			//@TODO add logging here.
			//logger.log('error', err);
			//logger.log('debug', 'pm2 list'.info);
		}		
		return typeof cb == 'function' ? cb() : true;
	});
	processes.stdout.on('data', function (data) {
		console.log(data);
	});	
};
var start = function (name, cb) {	
	exec('pm2 start '+name + ' --watch --name ' + name, {}, function(err, stdout, stderr) {
		
		if(err !== undefined && err !== null) {			
			//@TODO add logging here.
			// logger.log('error', err);
			//logger.log('debug', 'pm2 start '+name+''.info);
		}
		list();
		return typeof cb == 'function' ? cb() : true;
	});
 };
var stop = function(name, cb) {
	exec('pm2 stop '+name + ' --watch --name ' + name, {}, function(err, stdout, stderr) {
		
		if(err !== undefined && err !== null) {
			//@TODO add logging here.
			//logger.log('error', err);
			//logger.log('debug', 'pm2 stop '+name+''.info);
		}
		list();
		return typeof cb == 'function' ? cb() : true;
	});
};
var command = process.argv[2];

if (command === 'start') { start(apiEntryPoint); }
if (command === 'stop') { stop(apiEntryPoint); }