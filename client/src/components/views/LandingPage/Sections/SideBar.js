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
import GridCard from "../../../commons/GridCards";

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
        console.log(result);
        // console.log('Movies',...Movies)
        // console.log('result',...result.results)
        setMovies([...Movies, ...result.results]);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ width:"300", height:"100vh" }}>
      <Title level={2}> Top rate movies </Title>
      <hr />
      <Row gutter={[16, 16]}>
        {Movies &&
          Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard
                movieId={movie.id}
                movieName={movie.title}
              />
            </React.Fragment>
          ))}
      </Row>
    </div>
  );
}

export default SideBar;
