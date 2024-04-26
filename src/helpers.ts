import {
  MOVIES_API,
  CREDITS_API,
  API_KEY,
  CREDITS_DEPARTMENT_TYPES,
  SEARCH_API,
  ALL_GENRE_ID,
} from "./constants";
import { CreditTypes, CreditsMember, Movie, MoviesAPIParams } from "./types";

export const getMoviesAPI = ({
  primaryReleaseYear,
  votesPopularity,
  page,
  selectedGenres,
}: MoviesAPIParams) => {
  let updatedMoviesAPI = `${MOVIES_API}=${primaryReleaseYear}&page=${page}&vote_count.gte=${votesPopularity}`;
  if (selectedGenres.length && !selectedGenres.includes(ALL_GENRE_ID)) {
    updatedMoviesAPI += `&with_genres=${selectedGenres}`;
  }
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
  updatedMovies.sort((a: Movie, b: Movie) => b.popularity - a.popularity);
  return updatedMovies;
};

export const fetchMovies = async ({
  primaryReleaseYear,
  votesPopularity,
  page,
  selectedGenres,
}: MoviesAPIParams) => {
  const moviesAPI = getMoviesAPI({
    primaryReleaseYear,
    votesPopularity,
    page,
    selectedGenres,
  });
  const response = await fetch(moviesAPI, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });
  const moviesData = await response.json();
  return getParsedMovies(moviesData.results);
};

const getParsedCredits = (response: any) => {
  if (!response || !("cast" in response) || !("crew" in response)) return null;
  const { cast, crew } = response;
  let credits: CreditTypes = {
    directors: [],
    writers: [],
    stars: [],
  };
  const starsDetails = cast.slice(0, 3);
  starsDetails.forEach((member: CreditsMember) => {
    if (
      member.known_for_department.toLowerCase() ===
      CREDITS_DEPARTMENT_TYPES.ACTING
    ) {
      credits.stars.push(member.name);
    }
  });
  const director = crew.filter(
    (member: CreditsMember) =>
      member.known_for_department.toLowerCase() ===
      CREDITS_DEPARTMENT_TYPES.DIRECTOR
  )[0].name;

  credits.directors.push(director);

  const writer = crew.filter(
    (member: CreditsMember) =>
      member.known_for_department.toLowerCase() ===
      CREDITS_DEPARTMENT_TYPES.WRITING
  )[0].name;

  credits.writers.push(writer);

  return credits;
};

export const fetchCredits = async (movieId: number) => {
  if (!movieId) return null;
  const response = await fetch(`${CREDITS_API}/${movieId}/credits`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });
  const credits = await response.json();
  return getParsedCredits(credits);
};
export const storeMoviesByReleasedYears = (movies: Array<Movie>) => {
  const duplicateMovies = movies.slice();
  let filteredByYears: { [key: number]: Movie[] } = {};
  duplicateMovies.sort(
    (a, b) =>
      new Date(a.releaseDate).getFullYear() -
      new Date(b.releaseDate).getFullYear()
  );
  duplicateMovies.forEach((movie) => {
    const releasedYear = new Date(movie.releaseDate).getFullYear();
    if (!isNaN(releasedYear)) {
      if (filteredByYears[releasedYear]?.length) {
        filteredByYears[releasedYear].push(movie);
      } else {
        filteredByYears[releasedYear] = [movie];
      }
    }
  });
  return filteredByYears;
};

export const searchMovie = async (movieName: string) => {
  const response = await fetch(`${SEARCH_API}${movieName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });
  const searchedMovies = await response.json();

  const parsedMovies = getParsedMovies(searchedMovies.results);
  const moviesByReleasedYears = storeMoviesByReleasedYears(parsedMovies);
  return moviesByReleasedYears;
};
