import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import MultiSelect from "react-multi-select-component";
import { Typography, Row, Button, Form } from "antd";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../../Config";
import GridCard from "../../../commons/GridCards";
const { Title } = Typography;

export default function SelectedForm(){

  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result);
        // console.log('Movies',...Movies)
        console.log("result", result.results);
        setMovies([result.results]);
        // setMovies(JSON.parse(window.localStorage.getItem('movies')));
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };


  // SEARCH BY KEY WORDS
  const handleOnSubmit = (e) => {
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
      fetchMovies(
        `${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreIndex}`
      );
      setSelectedTechStacks("");
    }
  };

  const handleOnChange = (e) => {
    setSelectedTechStacks(...selectedTechStacks, e.target.value);
  };



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

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <div className="leading-loose w-6/12 sm: w-full">
          <form className=" m-4 p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit(handleOnSubmit)}>
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
                <Button onClick={handleOnSubmit}>
                  <span className="mr-1">Search</span>
                </Button>
              </div>
            </div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ textAlign: "center", flexDirection: "column" }}
        >
          <hr style={{ color: "white" }} />
          {movies && 
                movies.map((movie, index) => (
              <>
              <p> {movie.id}</p>
              <p>{movie.title}</p>
              </>
                ))}

          <br />
          {loading && (
            <div style={{ color: "white" }}>
              PLEASE ENTER ANY FUKING THING YOU WANT
            </div>
          )}
        </div>
      </div>
    </div>
  );
};