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

export default function LastestTvShow() {
    const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // }, []);
  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        // console.log('Movies',...Movies)
        // console.log('result',...result.results)
        setMovies([...Movies, ...result.results]);
        // setMovies(JSON.parse(window.localStorage.getItem('movies')));
        setCurrentPage(result.page);
        window.localStorage.setItem(`${CurrentPage}`, JSON.stringify(Movies));
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
  
  // const handleScroll = () => {
  //   const windowHeight =
  //     "innerHeight" in window
  //       ? window.innerHeight
  //       : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   if (windowBottom >= docHeight - 1) {
  //     // loadMoreItems()
  //     console.log("clicked");
  //     buttonRef.current.click();
  //   }
  // };

  return (
    <div style={{ backgroundColor:"#081b27", color:"white"}}>
      <div className="container" style={{ maxWidth:"fit-content", margin:"10px 10px", color:"white" }}>
      <div className="row" style={{ display: "flex" }}>
            <Title level={2}> Movies by latest </Title>
            <hr />
            <Row gutter={[16, 16]}>
              {Movies &&
                Movies.map((movie, index) => (
                  <React.Fragment key={index}>
                    <GridCard
                      image={
                        movie.poster_path
                          ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                          : null
                      }
                      movieId={movie.id}
                      movieName={movie.original_name}
                    />
                  </React.Fragment>
                ))}
            </Row>

            <br />
            {Loading && <div>Loading...</div>}

            <br />
            <div style={{ display: "flex", justifyContent: "center", color:"black" }}>
              <Button
                ref={buttonRef}
                className="loadMore"
                onClick={loadMoreItems}
              >
                Load More
              </Button>
            </div>
          </div>
      </div>
      </div>
  );
}
