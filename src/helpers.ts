import { MOVIES_API } from "./constants";
import { Movie, MoviesAPIParams } from "./types";

export const getMoviesAPI = ({
  primaryReleaseYear,
  votesPopularity,
  page,
}: MoviesAPIParams) => {
  const updatedMoviesAPI = `${MOVIES_API}=${primaryReleaseYear}&page=${page}&vote_count.gte=${votesPopularity}`;
  return updatedMoviesAPI;
};

export const getParsedMovies = (fetchedMovies: any) => {
  const updatedMovies = fetchedMovies.map((movie: any) => {
    const parsedMovie = {
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      genreIds: movie.genre_ids,
      id: movie.id,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      video: movie.video,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
    };
    return parsedMovie;
  });
  return updatedMovies;
};
