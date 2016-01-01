module.exports = function (knex, Promise) {

  return knex.schema.createTable('locations', function (t) {

    t.increments('id')
      .primary();
    t.string('name')
      .index()
      .unique()
      .notNullable();
    t.float('latitude')
      .notNullable();
    t.float('longitude')
      .notNullable();
    t.timestamp('date_added')
      .notNullable()
      .defaultTo(knex.raw('now()'));

  });

};
