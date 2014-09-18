// Load all files in this directory -  i.e. build a hash/tree of the exports from the ./ directory
var requireDirectory = require('require-directory');
module.exports = requireDirectory(module);