import React, { useState} from "react";
import { Typography, Row, Button } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from "../../Config";
import GridCard from "../../commons/GridCards";
import "bootstrap/dist/css/bootstrap.min.css";



const { Title } = Typography;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function Search() {
  const { handleSubmit } = useForm();
  const [Movie, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [movieByGenres, setMovieByGenres ] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);

  const options = [
    { label: "Action 🍇", value: "28" },
    { label: "Adventure 🥭", value: "12" },
    { label: "Animation 🍓", value: "16" },
    { label: "Comedy 🍉", value: "35" },
    { label: "Crime 🍐", value: "80" },
    { label: "Documentary 🍎", value: "99" },
    { label: "Drama 🍊", value: "18" },
    { label: "Family 🍍", value: "10751" },
    { label: "Fantasy 🍑", value: "14" },
    { label: "History 🍑", value: "36" },
    { label: "Horror 🍑", value: "27" },
    { label: "Music 🍑", value: "10402" },
    { label: "Mystery 🍑", value: "9648" },
    { label: "Romance 🍑", value: "10749" },
    { label: "Science Fiction 🍑", value: "878" },
    { label: "TV Movie 🍑", value: "10770" },
    { label: "Thriller 🍑", value: "53" },
    { label: "War 🍑", value: "10752" },
    { label: "Western 🍑", value: "37" },
  ];
  
// fetch data by key word
  const fetchMoviesByKeyword = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        // console.log('Movies',...Movies)
        window.localStorage.removeItem('searchByKeyword');
        console.log("result", ...result.results);
        setMovies([...result.results]);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  // fetch data by genre
  const fetchMoviesByGenre = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        // console.log('Movies',...Movies)
        console.log("result", ...result.results);
        setMovieByGenres([...result.results]);
        // setMovies(JSON.parse(window.localStorage.getItem('movies')));
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  //search by genre
  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const genreId = [];
    console.log("value", selectedTechStacks);
    for (let i = 0 ; i < selectedTechStacks.length; i++){
      let x = Number(selectedTechStacks[i].value)
      genreId.push(x)
    }
    console.log(genreId);
    const genreIndex = genreId.join()
    console.log(genreIndex)
    if (genreIndex) {
      fetchMoviesByGenre(
        `${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreIndex}`
        // `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=${kind}&year=2020&with_genres=${genreIndex}&with_keywords=${keywords}`
      );
      setSelectedTechStacks("");
    }
  };

  // SEARCH BY KEY WORDS
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (searchKeyWord) {
      fetchMoviesByKeyword(
        `${API_URL}search/movie?api_key=${API_KEY}&query=${searchKeyWord}`
      );
      setSearchKeyWord("");
    }
  };

  const handleOnChange = (e) => {
    setSearchKeyWord(e.target.value);
  };

  // CONFIG FOR MODEL ADV - SEARCH
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <div>
          <Button
            className="color-primary hasLabel hasIcon ltr-v8pdkb"
            tabindex="-1"
            type="button"
            onClick={handleOpen}
            style={{}}
          >
            Advanced Search
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}   style={{ width:"800px"}}>     
            <div className="mt-10">
      <div className="flex justify-center">
        <div className="leading-loose w-6/12 sm: w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(handleOnSubmitForm)}>
            <p className="text-gray-800 font-medium mb-5">Project information.</p>
            <div className="inline-block mt-2 w-full">
              <label className="text-sm text-gray-600 mb-2" htmlFor="techStack">
                Select tech stacks
              </label>
              <MultiSelect
                options={options}
                value={selectedTechStacks}
                onChange={setSelectedTechStacks}
                labelledBy={"Select"}
              />
            </div>
          </form>
          <div className="flex items-center justify-center mt-6">
              <div className="m-3">
                <Button onClick={handleOnSubmitForm}>
                  <span className="mr-1">Search</span>
                </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
            </Fade>
          </Modal>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ textAlign: "center", flexDirection: "column" }}
        >
          {!Loading && (
            <>
          <Title level={2} style={{ color: "white" }}>
            {" "}
            Movies Search By Keywords{" "}
          </Title>
          <hr style={{ color: "white" }} />
          
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
            </>
          )}

          {!Loading && (
            <>
          <Title level={2} style={{ color: "white" }}>
            {" "}
            Movies Search By Genres{" "}
          </Title>
          <hr style={{ color: "white" }} />
          
            <Row
              gutter={[16, 16]}
              style={{ textAlign: "center", padding: "8px", margin: "2px" }}
            >
              {movieByGenres &&
                movieByGenres.map((movieByGenre, index) => (
                  <React.Fragment key={index}>
                    <GridCard
                      image={
                        movieByGenre.poster_path
                          ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movieByGenre.poster_path}`
                          : null
                      }
                      movieId={movieByGenre.id}
                      movieName={movieByGenre.title}
                      style={{}}
                    />
                  </React.Fragment>
                ))}
            </Row>
            </>
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
