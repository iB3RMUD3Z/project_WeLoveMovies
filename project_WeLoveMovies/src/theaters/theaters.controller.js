const service = require("./theaters.service");
const { theaterNearYou } = require("../movies/movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;

  if (movieId !== undefined) {
    res.json({ data: await theaterNearYou(movieId) });
  } else {
    const theaterList = await service.list();
    const theatersMovieList = theaterList.map(async (theater) => {
      return { ...theater, movies: await service.theaterMovieList(theater) };
    });

    res.json({ data: await Promise.all(theatersMovieList) });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
