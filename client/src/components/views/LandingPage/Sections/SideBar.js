import React, { useEffect, useState, useRef } from "react";
import { Icon } from "antd";
import { Typography, Row } from "antd";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../../Config";

const { Title } = Typography;

function SideBar() {
  const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        // console.log('Movies',...Movies)
        // console.log('result',...result.results)
        setMovies([...result.results]);
        console.log("Movies", ...result.results);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Title level={4}> Top Rated Movies </Title>
      <hr />
      {Movies &&
        Movies.map((movie, index) => (
          <React.Fragment key={index}>
            <a href={"/movie/${movie.id}"}>
              <img
                style={{ maxWidth: "100px" }}
                alt={movie.title}
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : null
                }
              />
              <h4>{movie.title}</h4>
            </a>
          </React.Fragment>
        ))}
    </>
  );
}

export default SideBar;
