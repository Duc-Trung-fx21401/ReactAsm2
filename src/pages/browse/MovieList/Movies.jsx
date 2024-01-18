import { useEffect } from "react";
import classes from "./Movies.module.css";
import { useState } from "react";
import MovieDetail from "./MovieDetail";

const Movies = ({ category, title, isPoster }) => {
  const [listfilm, setListfilm] = useState([]);

  // Lấy API để tạo danh sách thể loại các Movie tương ứng
  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3${category}`);
      const data = await response.json();
      const movie = data.results;
      setListfilm(movie);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error.message);
    });
  }, []);

  return (
    <div className={classes.movieList}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.movieItem}>
        {listfilm.map((movie) => {
          // show từ danh sách các Movie ra từng movie cụ thể
          return (
            <MovieDetail
              title={movie.original_name}
              movie={movie}
              key={movie.id}
              isPoster={isPoster}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
