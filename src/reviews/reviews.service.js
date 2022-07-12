const knex = require("../db/connection");

function readCritic(criticId) {
  return knex("critics").where({ critic_id: criticId }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function movieReviews(movieId) {
  const reviews = await knex("reviews").where({ movie_id: movieId });
  return await Promise.all(reviews.map(setCritic));
}

function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

async function update(updatedReview) {
  const review = await knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
  review[0];
}

function getCritic(criticId) {
  return knex("critics").where({ critic_id: criticId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  readCritic,
  setCritic,
  movieReviews,
  read,
  update,
  getCritic,
  delete: destroy,
};
