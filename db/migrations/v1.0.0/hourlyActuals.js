module.exports = function (knex, Promise) {

  return knex.schema.createTable('hourly_actuals', function (t) {

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
    t.float("precipIntensity");
    t.float("precipProbability");
    t.float("temperature");
    t.float("apparentTemperature");
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
