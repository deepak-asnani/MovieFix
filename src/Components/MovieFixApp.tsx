import React from "react";
import Header from "./Header";
import Movies from "./Movies";
import MovieContextProvider from "../context/MovieContextProvider";

const MovieFixApp = () => {
  return (
    <MovieContextProvider>
      <div>
        <Header />
        <Movies />
      </div>
    </MovieContextProvider>
  );
};

export default MovieFixApp;
