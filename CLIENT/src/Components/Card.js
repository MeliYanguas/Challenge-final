/* eslint-disable */

import React from 'react';


const Card = ({title, description, year, URL_image}) => {
  
  return (
    <div className="movie">
      <img src={URL_image} alt={title} width="200px" />
      <div className="movie-info">
        <h4>{title}</h4>
        <p>{year}</p>
        <p>{description}</p>
      </div>
      
    </div>
  );
};

export default Card;
