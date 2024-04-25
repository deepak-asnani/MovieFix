import { createContext } from "react";
import { MovieContextProps } from "../types";
import { ALL_GENRE_ID } from "../constants";

const MovieContext = createContext<MovieContextProps>({
  selectedGenres: [ALL_GENRE_ID],
  setSelectedGenres: () => {},
  genres: [],
  setGenres: () => {},
  searchedResults: {},
  setSearchedResults: () => {}
});

export default MovieContext;
