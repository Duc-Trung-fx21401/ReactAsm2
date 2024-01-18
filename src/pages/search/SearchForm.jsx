import React, { useContext, useState } from "react";
import classes from "./SearchForm.module.css";
import MoviesContext from "../../Context/MovieContext";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const { setSearchedMovies } = useContext(MoviesContext);

  const API_KEY = "bd3074580ba5fae2f0b266af5c4d93dd";

  //Lấy API để searchMovie
  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const requests = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}=1&include_adult=false`
      );
      const data = await requests.json();
      console.log(data, "data");
      setSearchedMovies(data.results);
      console.log("abc", setSearchedMovies);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={searchHandler} className={classes.search_form}>
      <div className={classes.search_input}>
        <input
          type="search"
          name="query"
          placeholder="Enter your favorite"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          width="2rem"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </div>
      <div className={classes.btn}>
        <button
          type="button"
          onClick={() => setQuery("")}
          className={classes.search_btn_reset}>
          Reset
        </button>
        <button type="submit" className={classes.search_submit}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
