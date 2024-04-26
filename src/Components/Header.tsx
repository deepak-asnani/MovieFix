import { useQuery } from "@tanstack/react-query";
import { Genre, GenreProps } from "../types";
import { ALL_GENRE_ID, API_KEY, APP_TITLE, GENRES_API } from "../constants";
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/MovieContext";
import { searchMovie } from "../helpers";

/* Genre UI starts here */

const GenreContainer = ({
  id,
  name,
  isActive,
  handleGenreClick,
}: GenreProps) => {
  return (
    <div
      className={`${
        isActive ? "bg-red-600" : "bg-gray-600 "
      } hover:bg-white hover:text-black flex justify-center items-center text-white px-4 py-2 rounded-md cursor-pointer whitespace-nowrap`}
      onClick={() => handleGenreClick(id)}
    >
      {name}
    </div>
  );
};

/* Genre UI ends here */

const Header = () => {
  const {
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setSearchedResults,
  } = useContext(MovieContext);

  const [searchText, setSearchText] = useState("");

  const {
    data: searchedMovies,
    isLoading: isSearching,
    isError: searchFetchError,
    refetch,
  } = useQuery({
    queryKey: ["search"],
    queryFn: () => searchMovie(searchText),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: false,
  });

  const fetchMoviesGenresList = async () => {
    const response = await fetch(GENRES_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });
    const genresList: { genres: [] } = await response.json();
    return genresList.genres;
  };

  const {
    data: fetchedGenres,
    isLoading: areGenresFetching,
    isError: genresFetchError,
  } = useQuery({
    queryKey: ["moviesGenresList"],
    queryFn: fetchMoviesGenresList,
  });

  useEffect(() => {
    setGenres(fetchedGenres);
  }, [fetchedGenres]);

  useEffect(() => {
    setSearchedResults(searchedMovies);
  }, [searchedMovies]);

  /* filters previous genres Ids- It's a reusable function,
   which takes previous value of selected genres id's and the id which needs to be filtered out */
  const filterPrevGenresIds = (
    prevSelectedGenreIds: number[],
    exclusiveGenreId: number
  ) => {
    const filteredPrevSelectedGenres = prevSelectedGenreIds.filter(
      (genreId: number) => genreId !== exclusiveGenreId
    );
    return filteredPrevSelectedGenres;
  };

  /* After clicking on genre, whether the the genre should be selected or deselected,
   also manages the selectedGenresState */
  const handleGenreClick = (genreId: number) => {
    console.log("inside handle genre click:- ", genreId);
    setSelectedGenres((prevSelectedGenres: number[]) => {
      console.log("prev selected genres:- ", prevSelectedGenres);
      if (prevSelectedGenres.includes(ALL_GENRE_ID)) {
        console.log("inside if----")
        const filteredPrevSelectedGenres = filterPrevGenresIds(
          prevSelectedGenres,
          ALL_GENRE_ID
        );
        console.log("filtered prev selected genres id:- ", filterPrevGenresIds);
        return [...filteredPrevSelectedGenres, genreId];
      } else if (prevSelectedGenres.includes(genreId)) {
        console.log("-inside else if--------")
        const filteredPrevSelectedGenres = filterPrevGenresIds(
          prevSelectedGenres,
          genreId
        );

        console.log("filtered prev selected genres ids:- ", filteredPrevSelectedGenres);

        return filteredPrevSelectedGenres.length
          ? [...filteredPrevSelectedGenres]
          : [ALL_GENRE_ID];
      }
      return [...prevSelectedGenres, genreId];
    });
  };

  console.log("selected genres:- ", selectedGenres);

  const handleSearch = () => {
    if (searchText && !isSearching) {
      refetch();
    }
  };

  return (
    <div className="w-full h-[150px] bg-gray-800 p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center gap-4">
        <h1
          className="text-red-600 text-left rounded-full w-24"
          style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}
        >
          {APP_TITLE.toUpperCase()}
        </h1>
        <div className="flex items-center">
          <div className="relative right-4">
            <input
              type="text"
              placeholder="Movie Name"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (!e.target.value) {
                  setSearchedResults({});
                }
              }}
              className="text-white bg-gray-700 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {searchText && (
              <button
                className="text-white ml-2 absolute right-4 top-[3px]"
                onClick={() => {
                  setSearchText("");
                  setSearchedResults({});
                }}
              >
                &#10005; {/* Unicode character for cross (×) */}
              </button>
            )}
          </div>

          <button
            className="text-white bg-red-600 px-2 py-1 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        <GenreContainer
          id={ALL_GENRE_ID}
          name={"All"}
          isActive={selectedGenres.includes(ALL_GENRE_ID)}
          handleGenreClick={handleGenreClick}
        />
        {genres?.map((genre: Genre) => (
          <GenreContainer
            key={genre.id}
            id={genre.id}
            name={genre.name}
            isActive={selectedGenres.includes(genre.id)}
            handleGenreClick={handleGenreClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
