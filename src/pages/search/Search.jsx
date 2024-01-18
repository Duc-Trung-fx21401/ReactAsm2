import React from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultsList";
import NavBar from "../browse/Movie/NavBar";
import { MoviesContextProvider } from "../../Context/MovieContext";

const Search = () => {
  return (
    <MoviesContextProvider>
      <NavBar />
      <SearchForm />
      <ResultList />
    </MoviesContextProvider>
  );
};

export default Search;
