import React, { useEffect, useState, useRef } from "react";
import { Typography, Row, Button } from "antd";
import Sticky from "react-stickynode";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../Config";
import GridCard from "../../commons/GridCards";
import "bootstrap/dist/css/bootstrap.min.css";
const { Title } = Typography;

export default function Search() {
  const [Movie, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        // console.log('Movies',...Movies)
        console.log("result", ...result.results);
        setMovies([...result.results]);
        // setMovies(JSON.parse(window.localStorage.getItem('movies')));
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (searchKeyWord) {
      fetchMovies(
        `${API_URL}search/movie?api_key=${API_KEY}&query=${searchKeyWord}`
      );
      setSearchKeyWord("");
    }
  };

  const handleOnChange = (e) => {
    setSearchKeyWord(e.target.value);
  };

  return (
    <>
      <div
        className="searchPage"
        style={{
          backgroundColor: "#081b27",
          minHeight: "inherit",
        }}
      >
        <form
          onSubmit={handleOnSubmit}
          style={{ width: "100%", textAlign: "center" }}
        >
          <input
            className="search"
            type="search"
            placeholder="    Search..."
            value={searchKeyWord}
            onChange={handleOnChange}
            style={{
              width: "60%",
              margin: "10px 8px",
              borderRadius: "4rem",
              fontSize: "large",
              fontFamily: "ui-monospace",
            }}
          />
          <Button onClick={handleOnSubmit}>Search</Button>
        </form>
        <div
          className="d-flex justify-content-center"
          style={{ textAlign: "center", flexDirection: "column" }}
        >
          <Title level={2} style={{ color: "white" }}>
            {" "}
            Movies Search By Keywords{" "}
          </Title>
          <hr style={{ color: "white" }} />
          {Movie && (
            <Row
              gutter={[16, 16]}
              style={{ textAlign: "center", padding: "8px", margin: "2px" }}
            >
              {Movie &&
                Movie.map((movie, index) => (
                  <React.Fragment key={index}>
                    <GridCard
                      image={
                        movie.poster_path
                          ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                          : null
                      }
                      movieId={movie.id}
                      movieName={movie.title}
                      style={{}}
                    />
                  </React.Fragment>
                ))}
            </Row>
          )}

          <br />
          {Loading && (
            <div style={{ color: "white" }}>
              PLEASE ENTER ANY FUKING THING YOU WANT
            </div>
          )}
        </div>
      </div>
    </>
  );
}
