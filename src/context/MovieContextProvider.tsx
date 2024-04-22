import { ReactElement, useState } from "react";
import MovieContext from "./MovieContext";
import { ALL_GENRE_ID } from "../constants";

interface providerProps {
  children: ReactElement;
}

const MovieContextProvider = ({ children }: providerProps) => {
  const [selectedGenre, setSelectedGenre] = useState(ALL_GENRE_ID);
  return (
    <MovieContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;