module.exports = function(db, playBook){

  playBook.dailyPredictions = {

    add: function(params){

      var location = params.location;
      var dataArray = params.data;

      //TODO: some validation logic
      location = location.toLowerCase();

      return db('locations')
      .select('id', 'name')
      .where('name', location)
      .then(function(resp){

        if(resp.length === 0){
          throw new Error('No location called ' + location + ' exists.');
        }

        return resp[0].id;

      })
      .then(function(locationId){

        var insertionArray = dataArray.map(function(row){

          return {
            location_id: locationId,
            time: new Date(row.time*1000).toISOString(),
            summary: row.summary,
            sunriseTime: new Date(row.sunriseTime*1000).toISOString(),
            sunsetTime: new Date(row.sunsetTime*1000).toISOString(),
            moonPhase: row.moonPhase,
            precipIntensity: row.precipIntensity,
            precipIntensityMax: row.precipIntensityMax,
            precipProbability: row.precipProbability,
            temperatureMin: row.temperatureMin,
            temperatureMinTime: new Date(row.temperatureMinTime*1000).toISOString(),
            temperatureMax: row.temperatureMax,
            temperatureMaxTime: new Date(row.temperatureMaxTime*1000).toISOString(),
            apparentTemperatureMin: row.apparentTemperatureMin,
            apparentTemperatureMinTime: new Date(row.apparentTemperatureMinTime*1000).toISOString(),
            apparentTemperatureMax: row.apparentTemperatureMax,
            apparentTemperatureMaxTime: new Date(row.apparentTemperatureMaxTime*1000).toISOString(),
            dewPoint: row.dewPoint,
            humidity: row.humidity,
            windSpeed: row.windSpeed,
            windBearing: row.windBearing,
            visibility: row.visibility,
            cloudCover: row.cloudCover,
            pressure: row.pressure,
            ozone: row.ozone
          };

        });

        return db('daily_predictions')
        .insert(insertionArray);

      });
      

    },

    getLatestPredictionTime: function(params){

      var location = params.location;

      //TODO: some validation logic
      location = location.toLowerCase();

      return db('locations')
      .select('id', 'name')
      .where('name', location)
      .then(function(resp){

        if(resp.length === 0){
          throw new Error('No location called ' + location + ' exists.');
        }

        return resp[0].id;

      })
      .then(function(locationId){

        return db('daily_predictions')
        .max('predicted_at')
        .where('location_id', locationId)

      })
      .then(function(result){

        return result[0] ? result[0].max : null;

      });

    }

  };

};
