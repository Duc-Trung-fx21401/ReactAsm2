import React, { createContext, useState } from "react";

export const MoviesContext = createContext({});

export const MoviesContextProvider = ({ children }) => {
  const [activatedId, setActivatedId] = useState(null);
  const [activatedCategory, setActivatedCategory] = useState(null);
  const [searchMovies, setSearchedMovies] = useState([]);

  return (
    <MoviesContext.Provider
      value={{
        activatedId,
        activatedCategory,
        setActivatedCategory,
        setActivatedId,
        searchMovies,
        setSearchedMovies,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};
export default MoviesContext;
