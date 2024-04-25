import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, getParsedMovies } from "../helpers";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { Genre, Movie } from "../types";
import { DEFAULT_YEAR } from "../constants";

const renderMovies = (
  releasedYear: number,
  moviesList: { [key: number]: Movie[] },
  genres: Array<Genre>
) => {
  const movies = moviesList[releasedYear];
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie: Movie) => {
        const filteredGenres = genres
          .filter((genre) => movie.genreIds.includes(genre.id))
          .map((genre) => genre.name);
        return (
          <MovieCard
            key={`${movie.title}-${movie.id}`}
            {...movie}
            genres={filteredGenres}
          />
        );
      })}
    </div>
  );
};

const Movies = () => {
  const { selectedGenres, genres, searchedResults } = useContext(MovieContext);
  const [moviesList, setMoviesList] = useState<{ [key: string]: Movie[] }>(
    {}
  ); /* All movies regardless of filtered by genres */

  const [filteredMoviesList, setFilteredMoviesList] =
    useState(moviesList); /* Movies affected by genres */

  const [currentScrolledYear, setCurrentScrolledYear] =
    useState<number>(DEFAULT_YEAR);

  const votesPopularity = 100;
  const page = 1;

  /* Fetching Movies */
  const {
    data: fetchedMovies,
    isLoading: areMoviesFetching,
    isError: moviesFetchError,
  } = useQuery({
    queryKey: ["movies", currentScrolledYear, selectedGenres],
    queryFn: () =>
      fetchMovies({
        primaryReleaseYear: currentScrolledYear,
        votesPopularity,
        page,
        selectedGenres,
      }),
  });

  useEffect(() => {
    setFilteredMoviesList(moviesList);
  }, [moviesList]);

  /* Updating movies state whenever new movies are fetched from an API */

  useEffect(() => {
    if (fetchedMovies?.length) {
      const parsedMovies = getParsedMovies(fetchedMovies);
      const releasedYear = new Date(parsedMovies[0].releaseDate).getFullYear();
      setMoviesList((prevMoviesList) => {
        const updatedMoviesList = {
          ...prevMoviesList,
          [releasedYear]: [...parsedMovies],
        };
        return updatedMoviesList;
      });
    }
  }, [fetchedMovies]);

  const handleScroll = (event: any) => {
    if (areMoviesFetching) return;
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - parseInt(scrollTop) <= clientHeight + 1400) {
      setCurrentScrolledYear((prevYear) => prevYear + 1);
    } else if (
      (parseInt(scrollTop) >= 0 &&
        parseInt(scrollTop) < 300 &&
        currentScrolledYear >= 2012) ||
      (scrollTop < 1000 && currentScrolledYear < 2012)
    ) {
      setCurrentScrolledYear((prevYear) => prevYear - 1);
    }
  };
  
  const moviesToRender =
    searchedResults && Object.keys(searchedResults).length
      ? searchedResults
      : filteredMoviesList;

  if (moviesFetchError) return <div>Error fetching data</div>;

  return (
    <div
      className="bg-gray-400 p-4  overflow-y-scroll h-[100vh]"
      onScroll={handleScroll}
    >
      {Object.keys(moviesToRender).map((releasedYear) => {
        return (
          <div key={releasedYear}>
            <h1 className="text-white text-left font-bold">{releasedYear}</h1>
            {renderMovies(parseInt(releasedYear), moviesToRender, genres)}
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
