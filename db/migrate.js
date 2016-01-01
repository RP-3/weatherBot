var db = require('./dbConnection'),
    Promise = require('bluebird'),
    semver = require('semver');

var _migrations = [
  { name: 'v1.0.0', up: require('./migrations/v1.0.0.js').up }
];

Promise.try(function(){

  return Promise.resolve(_migrations)
  .each(function (migration) {

    return migration.up(db, Promise)
    .then(function(){

      console.log('Successfully ran ' + migration.name);

    });

  });

})
.then(function(){

  process.exit();

})
.catch(function(err){

  console.log('Migration failed.');

  throw err;

});
