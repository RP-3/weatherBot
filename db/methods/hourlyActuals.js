module.exports = function(db, playBook){

  playBook.hourlyActuals = {

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
            precipIntensity: row.precipIntensity,
            precipProbability: row.precipProbability,
            temperature: row.temperature,
            apparentTemperature: row.apparentTemperature,
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

        return db('hourly_actuals')
        .insert(insertionArray);

      });
      

    },

    getLatestLogTime: function(params){

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

        return db('hourly_actuals')
        .max('predicted_at')
        .where('location_id', locationId)

      })
      .then(function(result){

        return result[0] ? result[0].max : null;

      });

    }

  };

};
