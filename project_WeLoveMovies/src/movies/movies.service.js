const knex = require("../db/connection");

function list() {
  return knex("movies");
}

function nowShowing() {
  return knex("movies_theaters")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .select("movies.*")
    .where({ "movies_theaters.is_showing": true })
    .distinct("movies_theaters.movie_id");
}

function read(movie_id) {
  return knex("movies").where({ movie_id }).first();
}

function theaterNearYou(movieId) {
  return knex("movies_theaters")
    .join("movies", "movies_theaters.movie_id", "movies.movie_id")
    .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*")
    .where({ "movies_theaters.movie_id": movieId })
    .distinct("movies_theaters.theater_id");
}

module.exports = {
  list,
  nowShowing,
  read,
  theaterNearYou,
};
