exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary();
    table.text("content", null);
    table.integer("score", null);
    table.string("rating", null);
    table
      .integer("critic_id")
      .references("critic_id")
      .inTable("critics")
      .onDelete("CASCADE")
      .notNull();
    table
      .integer("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE")
      .notNull();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
