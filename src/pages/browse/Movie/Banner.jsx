import { useEffect } from "react";
import { useState } from "react";
import classes from "./Banner.module.css";
import NavBar from "./NavBar";
import { requests } from "../../../http-link";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  //Lấy API tạo banner, dùng effect để hiển thị ngay khi mở browser
  useEffect(() => {
    const fetchMovieHandler = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${requests.fetchNetflixOriginals}`
        );
        const data = await response.json();
        // dùng state để lấy dữ liệu random
        setMovies(
          data.results[Math.floor(Math.random() * data.results.length - 1)]
        );
        console.log(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieHandler();
  }, []);

  console.log("bdr", movies.backdrop_path);
  return (
    <div>
      <NavBar />
      {movies.backdrop_path && (
        <img
          className={classes.bg}
          //Ưu tiên dùng backdrop, nếu k có thì dùng poster
          src={`https://image.tmdb.org/t/p/original${
            movies.backdrop_path ? movies.backdrop_path : movies.poster_path
          } `}
        />
      )}
      <div className={classes.bannerMovie}>
        {movies.name && <p className={classes.title}>{movies.name}</p>}
        <div>
          <button className={classes.btn}>Play</button>
          <button className={classes.btn}>My List</button>
        </div>
        {movies.overview && (
          // hiển thị nội dung movie
          <p className={classes.text}>
            {movies.overview ? movies.overview : movies.original_name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Banner;
