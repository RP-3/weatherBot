module.exports = function (knex, Promise) {

  return knex.schema.createTable('daily_predictions', function (t) {

    //background data
    t.bigIncrements('id')
      .primary();
    t.integer('location_id')
      .references('id')
      .inTable('locations')
      .notNullable();
    t.timestamp('predicted_at')
      .index()
      .defaultTo(knex.raw('now()'));

    //weather data
    t.timestamp("time");
    t.string("summary");
    t.timestamp("sunriseTime");
    t.timestamp("sunsetTime");
    t.float("moonPhase");
    t.float("precipIntensity");
    t.float("precipIntensityMax");
    t.float("precipProbability");
    t.float("temperatureMin");
    t.timestamp("temperatureMinTime");
    t.float("temperatureMax");
    t.timestamp("temperatureMaxTime");
    t.float("apparentTemperatureMin");
    t.timestamp("apparentTemperatureMinTime");
    t.float("apparentTemperatureMax");
    t.timestamp("apparentTemperatureMaxTime");
    t.float("dewPoint");
    t.float("humidity");
    t.float("windSpeed");
    t.float("windBearing");
    t.float("visibility");
    t.float("cloudCover");
    t.float("pressure");
    t.float("ozone");

  });

};
