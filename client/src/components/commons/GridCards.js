import React from "react";
import { Col } from "antd";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../Config";
import './GridCard.css'
function GridCards(props) {
  let { actor, key, image, movieId, movieName, characterName } = props;


  if (actor) {
    return (
      // <Col key={key} lg={6} md={8} xs={24} className='movie' style={{ maxHeight: "300px", maxWidth: "250px" }}>
      //   <div style={{ position: "relative" }}>
      //     <img
      //       alt={characterName}
      //       src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
      //     />
      //   </div>
      // </Col>
        <div key={key} className = "wImage">
          <span className='image cover'>
            <img alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}/>
            <p>{characterName}</p>
          </span>

      </div>
    );
  } else {
    return (
      <Col key={key} lg={6} md={8} xs={24} className='movie' style={{ maxHeight: "478px", maxWidth: "250px" }}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${movieId}`}>
            <img
              style={{ maxWidth:"fit-content" }}
              alt={movieName}
              src={image}
            />
            <div className="movie-info">
              <h4>{movieName}</h4>
            </div>
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCards;

