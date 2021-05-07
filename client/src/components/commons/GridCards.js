import React from "react";
import { Col } from "antd";
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card, CardContent } from "@material-ui/core";
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
      <Col key={key} lg={6} md={8} xs={24} className='movie' style={{ backgroundColor:"#081b27", maxHeight: "500px", color:"white", border:"none", margin:"2px 0.25px" }}>
        <Card >
                <div >
                    <CardContent style={{ maxHeight: "480px", color:"white" }}>
                      <div style={{position: 'relative'}} style={{ backgroundColor:"#081b27",maxHeight: "480px", color:"white" }} >
                      <a href={`/movie/${movieId}`}>
                        <CardMedia
                            component="img"
                            className={movieName}
                            image= {image}
                        />
                        </a>
                      </div>
                    </CardContent>
                </div>             
            </Card>
            <div style={{
                          color: 'white', 
                          top: 8, 
                          left: '50%', 
                          fontSize:"15px",
                          height:"35px"
                        }} >{movieName}</div>    
      </Col>

             
      // <Col key={key} lg={6} md={8} xs={24} className='movie border border-light' style={{ maxHeight: "470px", color:"white" }}>
      //   <div style={{ position: "relative" }}>
      //     <a href={`/movie/${movieId}`}>
      //       <img
      //         style={{ maxWidth:"fit-content" }}
      //         alt={movieName}
      //         src={image}
      //       />
      //       <div className="movie-info" style={{ color:"white" }}>
      //         <h4>{movieName}</h4>
      //       </div>
      //     </a>
      //   </div>
      // </Col>
    );
  }
}

export default GridCards;

