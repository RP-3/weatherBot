module.exports = function(db, playBook){

  playBook.locations = {

    add: function(params){

      var name = params.name;
      var lat = params.lat;
      var long = params.long;

      //TODO: some validation logic
      name = name.toLowerCase();

      return db('locations')
      .insert({
        name: name,
        latitude:  lat,
        longitude: long
      })
      .returning('*');

    },

    list: function(params){

      return db('locations')
      .select()
      .then(function(resp){

        return resp.map(function(location){

          return {
            name: location.name,
            latitude: location.latitude,
            longitude: location.longitude
          };

        });

      });

    }

  };

};
