import React from 'react';
import './styleSimple.css';
import MoviesListPublic from './MoviesListPublic';

const Home = () => (
  <div className="route">
    Soy la pagina principal (home)
    <MoviesListPublic />
  </div>
);

export default Home;
