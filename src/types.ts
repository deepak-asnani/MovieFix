import { MouseEventHandler } from "react";

export interface MoviesAPIParams {
  primaryReleaseYear: number;
  votesPopularity: number;
  page: number;
}

export interface Movie {
  adult: boolean;
  backdropPath: string;
  genreIds: Array<number>;
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreProps extends Genre {
  isActive: boolean;
  handleGenreClick: Function;
}

export interface MovieContextProps {
  selectedGenre: number;
  setSelectedGenre: Function;
}
