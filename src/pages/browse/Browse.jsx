import React from "react";
import NavBar from "./Movie/NavBar";
import Banner from "./Movie/Banner";
import MovieList from "./MovieList/MovieList";

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
