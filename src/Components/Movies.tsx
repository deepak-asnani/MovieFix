import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMoviesAPI, getParsedMovies } from "../helpers";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { Movie } from "../types";

const renderMovies = (
  releasedYear: number,
  moviesList: { [key: number]: Movie[] }
) => {
  const movies = moviesList[releasedYear];
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard />
      ))}
    </div>
  );
};

const Movies = () => {
  const { selectedGenre } = useContext(MovieContext);
  const [moviesList, setMoviesList] = useState<{ [key: number]: Movie[] }>({});
  const defaultYear = 2012;
  const [currentScrolledYear, setCurrentScrolledYear] =
    useState<number>(defaultYear);
  const votesPopularity = 100;
  const page = 1;

  const fetchMovies = async () => {
    const moviesAPI = getMoviesAPI({
      primaryReleaseYear: currentScrolledYear,
      votesPopularity,
      page,
    });
    const response = await fetch(moviesAPI);
    const moviesData = await response.json();
    return moviesData.results;
  };

  const {
    data: fetchedMovies,
    isLoading: areMoviesFetching,
    isError: moviesFetchError,
  } = useQuery({
    queryKey: ["movies", currentScrolledYear],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (fetchedMovies.length) {
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

  if (areMoviesFetching) return <div>Loading...</div>;
  if (moviesFetchError) return <div>Error fetching data</div>;

  return (
    <div>
      {Object.keys(moviesList).map((releasedYear) => {
        return (
          <div>
            <h1>{releasedYear}</h1>
            {renderMovies(parseInt(releasedYear), moviesList)}
          </div>
        );
      })}
    </div>
  );
};

export default Movies;
