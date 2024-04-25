import { ReactElement, useState } from "react";
import MovieContext from "./MovieContext";
import { ALL_GENRE_ID } from "../constants";

interface providerProps {
  children: ReactElement;
}

const MovieContextProvider = ({ children }: providerProps) => {
  const [selectedGenres, setSelectedGenres] = useState([ALL_GENRE_ID]);
  const [genres, setGenres] = useState([]);
  const [searchedResults, setSearchedResults] = useState({});
  return (
    <MovieContext.Provider
      value={{
        selectedGenres,
        setSelectedGenres,
        genres,
        setGenres,
        searchedResults,
        setSearchedResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
