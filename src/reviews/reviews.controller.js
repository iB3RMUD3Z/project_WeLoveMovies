const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function read(req, res) {
  const { movieId } = req.params;
  res.json({ data: await service.movieReviews(movieId) });
}

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }

  next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res) {
  const { review_id, critic_id } = res.locals.review;
  const reviewUpdate = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(reviewUpdate);

  const review = await service.read(review_id);
  const UpdatedReview = {
    ...review,
    updated_at: "string",
    created_at: "string",
    critic: await service.getCritic(critic_id),
  };

  res.json({ data: UpdatedReview });
}

async function destroy(_req, res) {
  const { review_id } = res.locals.review;
  await service.delete(review_id);
  res.sendStatus(204);
}

module.exports = {
  read: asyncErrorBoundary(read),
  update: [asyncErrorBoundary(reviewExists), update],
  delete: [asyncErrorBoundary(reviewExists), destroy],
};
