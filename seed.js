/*
Short script to seed the database with 
San Francisco, Sydney and Salisbury.

I.e., 


 id |     name      | latitude | longitude |          date_added           
----+---------------+----------+-----------+-------------------------------
  1 | san francisco |  37.7869 |  -122.429 | 2015-12-31 22:15:39.812422-08
  2 | salisbury     |  51.0696 |  -1.79444 | 2015-12-31 22:18:40.473909-08
  3 | sydney        | -33.8655 |   151.208 | 2015-12-31 22:19:38.395395-08

*/

var db = require('./db/index.js');
var scraper = require('./scraper/index.js');
var moment = require('moment');

db.locations.add({
  name: "san francisco",
  lat: 37.7869,
  long: -122.429
})
.then(function(){

  return db.locations.add({
    name: "salisbury",
    lat: 51.0696,
    long: -1.79444
  });

})
.then(function(){

  return db.locations.add({
    name: "sydney",
    lat: -33.8655,
    long: 151.208
  });

})
.then(function(){

  console.log('Seed successful');
  process.exit();

});
