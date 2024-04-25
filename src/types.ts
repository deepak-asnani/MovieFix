import { MouseEventHandler } from "react";

export interface MoviesAPIParams {
  primaryReleaseYear: number;
  votesPopularity: number;
  page: number;
  selectedGenres: number[]
}

export interface Movie {
  adult: boolean;
  backdropPath: string;
  genreIds: Array<number>;
  id: number;
  originalLanguage: string;
  originalTitle?: string;
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
  isActive?: boolean;
  handleGenreClick: Function;
}

export interface MovieContextProps {
  selectedGenres: Array<number>;
  setSelectedGenres: Function;
  genres: Array<Genre>;
  setGenres: Function;
  searchedResults: { [key: number]: Movie[] };
  setSearchedResults: Function;
}

export interface CreditsMember {
  name: string;
  known_for_department: string;
  job: string;
}

export interface CreditTypes {
  directors: string[];
  writers: string[];
  stars: string[];
}

