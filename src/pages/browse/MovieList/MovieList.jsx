import React from "react";
import { requests } from "../../../http-link";
import Movies from "./Movies";
import { MoviesContextProvider } from "../../../Context/MovieContext";

const MovieList = () => {
  return (
    <MoviesContextProvider>
      <Movies
        category={requests.fetchNetflixOriginals}
        title={null}
        isPoster={true}
      />
      <Movies
        category={requests.fetchTrending}
        title="Xu hướng"
        isPoster={false}
      />
      <Movies
        category={requests.fetchTopRated}
        title="Xếp hạng cao"
        isPoster={false}
      />
      <Movies
        category={requests.fetchActionMovies}
        title="Hành động"
        isPoster={false}
      />
      <Movies
        category={requests.fetchComedyMovies}
        title="Hài"
        isPoster={false}
      />
      <Movies
        category={requests.fetchHorrorMovies}
        title="Kinh dị"
        isPoster={false}
      />
      <Movies
        category={requests.fetchRomanceMovies}
        title="Lãng mạn"
        isPoster={false}
      />
      <Movies
        category={requests.fetchDocumentaries}
        title="Tài liệu"
        isPoster={false}
      />
    </MoviesContextProvider>
  );
};
export default MovieList;
