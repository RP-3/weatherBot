var config = require('../config.js').db;

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  }
});

module.exports = knex;
