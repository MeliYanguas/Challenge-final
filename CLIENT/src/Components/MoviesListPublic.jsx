/* eslint-disable */

import React, { useState, useEffect } from 'react';
import Card from './Card';

const MoviesListPublic = () => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const getMovies = () => {
      fetch('http://localhost:4000/movies')
        .then((res) => res.json())
        .then((res) => setMovies(res));
    };
    getMovies();
  }, []);

  return (
    <div className="movie-container">
      {movies.map(movie  => 
        <Card key={movie.id} {...movie} />
      )}
    </div>
  );
};

export default MoviesListPublic;
