const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  if (req.query.is_showing !== "true") {
    res.json({
      data: await service.list(),
    });
  } else {
    res.json({
      data: await service.nowShowing(),
    });
  }
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

function read(_req, res) {
  res.status(200).json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
};
