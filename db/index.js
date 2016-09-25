var fs = require('fs');
var db = require('./dbConnection.js');

var methods = {};
fs.readdirSync(__dirname + '/methods').forEach(function (file) {

  if (file.indexOf('.js') !== -1) {
    require('./methods/' + file)(db, methods);
  }
 
});

module.exports = methods;
