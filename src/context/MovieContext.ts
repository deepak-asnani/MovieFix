import { createContext } from "react";
import { MovieContextProps } from "../types";
import { ALL_GENRE_ID } from "../constants";

const MovieContext = createContext<MovieContextProps>({
  selectedGenre: ALL_GENRE_ID,
  setSelectedGenre: () => {},
});

export default MovieContext;
