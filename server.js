var db = require('./db/index.js');
var scraper = require('./scraper/index.js');
var moment = require('moment');

//log predictions
setInterval(function(){

  db.locations.list({})
  .then(function(resp){

    //refresh hourly forecasts
    resp.forEach(function(location){

      //check when the last update was
      db.hourlyPredictions.getLatestPredictionTime({
        location: location.name
      })
      .then(function(timeString){

        var hourElapsed = moment(new Date(timeString))
        .isBefore(moment().startOf('hour'));

        //if the last update was not in this hour
        if(timeString === null ||  hourElapsed){
          //get the latest hourly predictions for that location
          scraper.getHourlyPredictions({
            lat: location.latitude,
            long: location.longitude
          })
          //log them
          .then(function(resp){

            return db.hourlyPredictions.add({
              location: location.name,
              data: resp
            });

          })
          .then(function(){
            console.log('Hourly predictions updated at', new Date(), 'for ' + location.name);
          });

        }

      });

    });


    //refresh daily forecasts
    resp.forEach(function(location){

      //check when the last update was
      db.dailyPredictions.getLatestPredictionTime({
        location: location.name
      })
      .then(function(timeString){

        var hourElapsed = moment(new Date(timeString))
        .isBefore(moment().startOf('hour').subtract(6, 'hours'));

        //if the last update was over 6 hours ago
        if(timeString === null || hourElapsed){
          //get the latest hourly predictions for that location
          scraper.getDailyPredictions({
            lat: location.latitude,
            long: location.longitude
          })
          //log them
          .then(function(resp){

            return db.dailyPredictions.add({
              location: location.name,
              data: resp
            });

          })
          .then(function(){
            console.log('Daily predictions updated at ', new Date(), 'for ' + location.name);
          });

        }

      });

    });

  });

}, 3000); //30 seconds


//log actuals
setInterval(function(){

  db.locations.list({})
  .then(function(resp){

    resp.forEach(function(location){

      db.dailyActuals.getLatestLogTime({
        location: location.name
      })
      .then(function(timeString){

        var scrapedResp;

        var isBeforeYesterday = moment(new Date(timeString))
        .isBefore(moment().startOf('day').subtract(1, 'days'));

        //if the last update was before yesterday
        if(timeString === null || isBeforeYesterday){

          var middayYesterday = moment()
          .startOf('day')
          .subtract(1, 'days')
          .add(12, 'hours')
          .format('YYYY-MM-DDTHH:mm:ssZZ');

          //get the actual weather for that day
          scraper.getActualOnDay({
            lat: location.latitude,
            long: location.longitude,
            time: middayYesterday
          })
          //log them
          .then(function(resp){

            scrapedResp = resp;

            return db.dailyActuals.add({
              location: location.name,
              data: scrapedResp.daily
            });

          })
          .then(function(){

            return db.hourlyActuals.add({
              location: location.name,
              data: scrapedResp.hourly
            });

          })
          .then(function(){
            console.log('Daily predictions updated at ', new Date(), 'for ' + location.name);
          });


        }

      })

    });

  });

}, 3600000); //every hour
