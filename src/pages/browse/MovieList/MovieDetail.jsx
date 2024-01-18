import { useCallback, useContext, useState } from "react";
import classes from "./MovieDetail.module.css";
import { MoviesContext } from "../../../Context/MovieContext";
import YouTube from "react-youtube";

const MovieDetail = ({ category, isPoster, movie }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [trailer, setTrailer] = useState([]);

  const {
    activatedId,
    activatedCategory,
    setActivatedCategory,
    setActivatedId,
  } = useContext(MoviesContext);
  // fetch API lấy video
  const fetchTrailerHandle = async () => {
    try {
      const requests = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=bd3074580ba5fae2f0b266af5c4d93dd`
      );
      const data = await requests.json();
      const resVideo = data.results;
      console.log("123", resVideo);
      if (resVideo.length !== 0) {
        // lấy key để hiển thị video
        let filteredVideo = [];
        filteredVideo = resVideo.filter(
          //lọc ra site và type để lấy được video. Ưu tiên trailer
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (filteredVideo.length === 0) {
          filteredVideo = resVideo.filter(
            (video) => video.site === "YouTube" && video.type === "Teaser"
          );
        }

        console.log(filteredVideo);
        // Lấy ra info của từng movie
        setTrailer(filteredVideo);
      }
    } catch (error) {
      console.error(error.message);
    }
    showDetailHandler();
  };

  const showDetailHandler = () => {
    //tạo điều kiện đáp ứng đủ thì mới hiện trailer đầu tiên và duy nhất
    if (movie.id !== activatedId && category !== activatedCategory) {
      setActivatedId(movie.id);
      setActivatedCategory(category);
      setShowDetail(true);
    }
    //cùng Movie nhưng khác thể loại
    if (movie.id === activatedId && category !== activatedCategory) {
      setActivatedCategory(category);
      setShowDetail(true);
    }
    // cùng thể loại nhưng khác Movie
    if (movie.id !== activatedId && category === activatedCategory) {
      setActivatedId(movie.id);
      setShowDetail(true);
    }
    // cùng Movie và cùng thể loại
    if (movie.id === activatedId && category === activatedCategory) {
      setShowDetail(!showDetail);
    }
  };

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
      origin: "https://www.youtube.com/",
    },
  };

  return (
    <div>
      <img
        onClick={fetchTrailerHandle}
        // lấy props isPoter để giá trị là backdrop hoặc poster
        src={`https://image.tmdb.org/t/p/original${
          isPoster
            ? movie.poster_path
            : movie.backdrop_path
            ? movie.backdrop_path
            : movie.poster_path
        }`}
        alt={movie.title}
        className={classes.img}
      />
      {/* đáp ứng đủ tiêu chí thì hiện movie */}
      {movie.id === activatedId &&
        category === activatedCategory &&
        showDetail && (
          <div className={classes.detail}>
            <div className={classes.detail_info}>
              {/* dựa trên API nếu có thuộc tính nào thì dùng thuộc tính đó */}
              <h3>{movie.title || movie.name}</h3>
              <h4>
                Release Date: {movie.first_air_date || movie.release_date}
              </h4>
              <h4>Vote: {movie.vote_average} / 10</h4>
              <p>
                {movie.overview ? movie.overview : `There is no overview yet`}
              </p>
            </div>
            {/* Trailer hiện ra với thông tin */}
            {trailer.length > 0 ? (
              //lấy key từ các obj để là key duy nhất
              <YouTube videoId={trailer[0].key} opts={opts} />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`}
                alt={movie.title}
                className={classes.img_info}
              />
            )}
          </div>
        )}
    </div>
  );
};
export default MovieDetail;
