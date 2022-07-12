exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table
      .integer("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE")
      .notNull();
    table
      .integer("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("CASCADE")
      .notNull();
    table.boolean("is_showing", null);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
