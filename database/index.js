var Orm	= require('orm'),
    requireDirectory = require('require-directory'),
    modelDirectory = "./models/",
    models = requireDirectory(module, modelDirectory);

module.exports = {
  db: this.db,

  init: function (options) {
    if (options) {
      	this.db = Orm.connect(options, function (err, db) {
        	   if (err) throw err;
    	   });

        for (var modelName in models){
            this.db.load(modelDirectory+modelName, function (err) {
                  if (err) throw err;
            });
        }
    }
  }
}