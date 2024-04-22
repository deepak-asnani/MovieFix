import { useQuery } from "@tanstack/react-query";
import { Genre, GenreProps } from "../types";
import { ALL_GENRE_ID, API_KEY, APP_TITLE, GENRES_API } from "../constants";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";

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
      } flex justify-center items-center text-white px-4 rounded-md cursor-pointer`}
      onClick={() => handleGenreClick(id)}
    >
      {name}
    </div>
  );
};

/* Genre UI ends here */

const Header = () => {
  const { selectedGenre, setSelectedGenre } = useContext(MovieContext);

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
    data: genres,
    isLoading: areGeresFetching,
    isError: genresFetchError,
  } = useQuery({
    queryKey: ["moviesGenresList"],
    queryFn: fetchMoviesGenresList,
  });

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="w-full h-[150px] bg-gray-800 p-4 flex flex-col justify-between">
      <h1
        className="text-red-600 text-left rounded-full w-24"
        style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}
      >
        {APP_TITLE.toUpperCase()}
      </h1>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        <GenreContainer
          id={ALL_GENRE_ID}
          name={"All"}
          isActive={ALL_GENRE_ID === selectedGenre}
          handleGenreClick={handleGenreClick}
        />
        {genres?.map((genre: Genre) => (
          <GenreContainer
            key={genre.id}
            id={genre.id}
            name={genre.name}
            isActive={genre.id === selectedGenre}
            handleGenreClick={handleGenreClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
