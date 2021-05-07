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
const { Title } = Typography;

export default function Search() {
  const buttonRef = useRef(null);
  const [Movie, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  useEffect(() => {
    const endpoint = `${API_URL}search/keyword?api_key=${API_KEY}&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        // console.log('Movies',...Movies)
        console.log('result',...result.results)
        setMovies([...Movie, ...result.results]);
        // setMovies(JSON.parse(window.localStorage.getItem('movies')));
        setCurrentPage(result.page);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    console.log("CurrentPage", CurrentPage);
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchKeyWord) {
      fetchMovies(`${API_URL}search/movie?api_key=${API_KEY}&query=${searchKeyWord}`);
      setSearchKeyWord("");
    }
  };

  const handleOnChange = (e) => {
    setSearchKeyWord(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input
          className="search"
          type="search"
          placeholder="Search..."
          value={searchKeyWord}
          onChange={handleOnChange}
        />
        <Button onClick={handleOnSubmit}>Search</Button>
      </form>

      <Title level={2}> Movies by latest </Title>
      <hr />
      {searchKeyWord && (
        <Row gutter={[16, 16]}>
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
                />
              </React.Fragment>
            ))}
        </Row>
      )}

      {!searchKeyWord && <div>PLEASE ENTER ANY FUKING THING YOU WANT</div>}

      <br />
      {Loading && <div>Loading...</div>}

      <br />
      <div
        style={{ display: "flex", justifyContent: "center", color: "black" }}
      >
        <Button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
          Load More
        </Button>
      </div>
    </>
  );
}
