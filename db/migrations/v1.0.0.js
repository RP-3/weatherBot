var locations = require('./v1.0.0/locations'),
    hourlyPredictions = require('./v1.0.0/hourlyPredictions')
    dailyPredictions = require('./v1.0.0/dailyPredictions')
    hourlyActuals = require('./v1.0.0/hourlyActuals')
    dailyActuals = require('./v1.0.0/dailyActuals');

exports.up = function(knex, Promise) {

  return locations(knex, Promise)
    .then(function(){

      return hourlyPredictions(knex, Promise);

    })
    .then(function(){

      return dailyPredictions(knex, Promise);

    })
    .then(function(){

      return hourlyActuals(knex, Promise);

    })
    .then(function(){

      return dailyActuals(knex, Promise);

    });

};

exports.down = function(knex, Promise) {

  return;

};
