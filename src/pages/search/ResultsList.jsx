import { useContext } from "react";
import classes from "./ResultsList.module.css";
import MoviesContext from "../../Context/MovieContext";
import MovieDetail from "../browse/MovieList/MovieDetail";

const ResultList = () => {
  const { searchMovies } = useContext(MoviesContext);

  return (
    <div className={classes.result_list}>
      <h4>Search Result</h4>

      {searchMovies.length === 0 && (
        <p className={classes.no_result}> No Result yet!</p>
      )}
      {/* lấy dữ liệu từ searchMovie ra từng MovieDetail */}
      <div className={classes.result_item}>
        {searchMovies.map((movie) => (
          <MovieDetail
            key={movie.id}
            isPoster={true}
            movie={movie}
            category={`Search Result`}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultList;
